# PHP + Laravel — rules
> Targets: PHP 8.1–8.5 / Laravel 11–13 · Source: laravel.com/docs · Updated: 2026-06-15

## Structure (Laravel 11+ streamlined)
- New apps use the streamlined structure: there is NO `app/Http/Kernel.php` or `Console/Kernel.php`; routing/middleware/exceptions/providers are code-first in `bootstrap/app.php`, with a single `AppServiceProvider`. Rules referring to `Kernel.php` are outdated. Do NOT migrate an existing project on the old structure just for the upgrade.
- Controllers/middleware/form-requests stay thin, in `app/Http`; business logic goes into services/actions, not the controller. Models live in `app/Models`, background jobs in `app/Jobs`.
- Generate classes via `php artisan make:*` (`make:request`, `make:job`, `make:policy`, `make:rule`).
- Stateful web → `routes/web.php` (session+CSRF); stateless API → `routes/api.php` (`php artisan install:api`, Sanctum tokens).

## Validation
- Validation + authorization live in a Form Request (`php artisan make:request`), via the `rules()` and `authorize()` methods.
- Reject undeclared fields: the `FailOnUnknownFields` attribute on the request class (or globally in `AppServiceProvider`).
- Complex rules — rule objects (`php artisan make:rule`).

## Eloquent / data
- N+1: eager-load via `->with(...)`. In a "child → parent" loop add `->chaperone()`.
- In dev enable `Model::shouldBeStrict()` (or `preventLazyLoading(! app()->isProduction())`) in `AppServiceProvider::boot()` — it catches lazy loading / missing attributes.
- Mass assignment: on every model set `$fillable` (allow-list) or `$guarded` BEFORE `create()/fill()` — protects against privilege escalation via `is_admin` and the like.
- Migrations — Schema builder in `database/migrations`, in the same change as the code. No manual SQL in production.

## Security
- Parameterized queries only (Query Builder/Eloquent on PDO bindings); never concatenate user input into `whereRaw/DB::raw` — pass it as a binding.
- CSRF automatic for the `web` group; stateless API — in `api.php` with token authorization.
- Rate limit: the `throttle` middleware on routes; arbitrary actions — the `RateLimiter::attempt(...)` facade.
- Secrets only in `.env`/config.

## Testing
- `php artisan test` (Pest/PHPUnit); `tests/Feature` and `tests/Unit`, classes with the `Test` suffix.
- Data — factories (`User::factory()->create()`); DB reset — the `RefreshDatabase` trait; assertions `assertDatabaseHas/Count`.

## Quality / tooling
- Formatting — **Laravel Pint** (`./vendor/bin/pint`). Static analysis — **Larastan** (PHPStan for Laravel, the ecosystem standard).

## Async / jobs
- Long-running work (mail, ASR/LLM/ffmpeg, external APIs) — into queues (`make:job`, `queue:work`), not inline in the HTTP handler.

## Conflicts with
- (none; one backend framework is chosen per service: php-laravel ⊥ python-django ⊥ node-nestjs per project)
