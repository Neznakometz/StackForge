# Python + Django/DRF — rules
> Targets: Python 3 / Django 4.2–6.0 / DRF 3.x · Source: docs.djangoproject.com, django-rest-framework.org · Updated: 2026-06-15

## Structure / conventions
- All validation lives on the serializer (DRF), NOT in the view (separation of concerns).
- `serializer_class` (or `get_serializer_class()`) on generic views/viewsets; `ModelViewSet` provides list/create/retrieve/update/destroy.
- Field/model names — lower_snake_case, not camelCase.

## Validation
- Per-field — the `validate_<field>(self, value)` method; per-object — `validate(self, data)`.
- Read input only from `serializer.validated_data` after `is_valid(raise_exception=True)` (auto-400).
- Saving — the `perform_create/perform_update` hooks, raise `ValidationError()`.
- Cross-field rules — reusable validators, not duplicated.

## ORM / data
- N+1: `select_related()` for forward FK/one-to-one (JOIN), `prefetch_related()` for reverse FK/M2M (batched query).
- Don't `.filter()` after `prefetch_related('x')` on the same relation — it resets the prefetch cache; use a `Prefetch` object with a filtered queryset.
- Multi-write — inside `transaction.atomic()` (block or decorator).
- The queryset is parameterized and injection-safe — prefer the ORM over raw SQL.

## Security
- The CSRF middleware is on by default; `@csrf_exempt` — only when strictly necessary.
- Raw SQL (`raw()/extra()/RawSQL`) — user input only via `params`, no string formatting and no quotes around `%s`.
- Production checklist: `DEBUG=False`, `SECURE_SSL_REDIRECT=True`, `SESSION_COOKIE_SECURE=True`, `CSRF_COOKIE_SECURE=True`; verify with `python manage.py check --deploy`.
- `SECRET_KEY` and DB credentials — from the environment, not in code.
- DRF: global `DEFAULT_PERMISSION_CLASSES` (e.g. `IsAuthenticated`), not per-view AllowAny. Throttling — `DEFAULT_THROTTLE_CLASSES` + `DEFAULT_THROTTLE_RATES`.

## Testing
- Django: `TestCase` (unittest) + the test `Client`; shared data — `setUpTestData()` (faster than per-test fixtures).
- DRF: `APITestCase`, `self.client` = `APIClient`; auth in tests — `force_authenticate(user=...)`.

## Quality / tooling
- Django core: `black` + `isort` via `pre-commit` (import groups: future→stdlib→third-party→Django→local). For application code the ecosystem standard is `ruff` + `mypy`.

## Async / jobs
- Long-running work — into a task queue (de facto Celery) or native async views; keep the request handler fast.
