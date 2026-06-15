# Node + NestJS — rules
> Targets: Node.js / NestJS 10–11 · Source: docs.nestjs.com · Updated: 2026-06-15

## Structure / conventions
- Controllers handle only HTTP and delegate work to providers (services) — thin controllers.
- Code organized by feature modules; `@Module({ controllers, providers })`. Scaffold: `nest g module/controller/service`.
- DI by type via the IoC container: services are `@Injectable()` providers, not `new`.

## Validation
- Globally: `app.useGlobalPipes(new ValidationPipe())` in bootstrap.
- Rules — `class-validator` decorators on DTO classes (`@IsEmail()`, `@IsNotEmpty()`...). Install `class-validator class-transformer`.
- DTOs are concrete classes, NOT interfaces/generics (TS erases metadata); import DTOs without `import type`.
- `whitelist: true` strips undeclared fields; `forbidNonWhitelisted: true` — 400 on extra fields; `transform: true` — typed DTOs + coercion.
- DTO variants — `PartialType()/PickType()/OmitType()` from `@nestjs/mapped-types`, not duplicated.
- Path/query primitives — `ParseIntPipe/ParseUUIDPipe/...`.

## Security
- Secure-by-default: an auth guard globally via the `APP_GUARD` provider, with exceptions through a custom `@Public()` (`SetMetadata`) that the guard reads via `Reflector`.
- Access — Guards (before the handler); policies — authorization guards.
- `helmet` (headers), `@nestjs/throttler` (rate limit), `csrf-csrf` (CSRF for stateful).
- Config — `@nestjs/config` (`ConfigService`) from env; don't hardcode secrets.

## Data
- SQL via TypeORM/Prisma/MikroORM; encapsulate DB access in repository/service providers, not in controllers.

## Testing
- `Test.createTestingModule({...}).compile()`; swap dependencies with `.overrideProvider(X).useValue(...)`. Runner — Jest (Nest is tool-agnostic).
- e2e — Supertest `request(app.getHttpServer())`, files `*.e2e-spec`.

## Quality / tooling
- ESLint + Prettier ship in the default `nest new` — the endorsed set.

## Async / jobs
- Background work — `@nestjs/bullmq` queues (BullMQ on Redis); processors are providers. The request handler does no heavy work.
