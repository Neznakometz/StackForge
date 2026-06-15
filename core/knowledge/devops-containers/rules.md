# Docker / Kubernetes / Traefik — rules
> Targets: Docker (current) / K8s 1.3x / Traefik v3 · Source: docs.docker.com, kubernetes.io, doc.traefik.io · Updated: 2026-06-15

## Docker
- **Multi-stage builds** — only what's needed for runtime in the final image (`COPY --from`).
- Pin the base image by tag and digest (`@sha256:...`); a minimal image from a trusted source.
- Run as non-root via `USER` (create the user/group in the Dockerfile, no `sudo`).
- `.dockerignore` — a small build context; one process/concern per container.
- Layer order for caching: the dependency manifest and install BEFORE copying the sources. `HEALTHCHECK`.
- **Don't put secrets in `ARG`/`ENV`/layers** — they persist in the image. Only `RUN --mount=type=secret,id=...` (the build check `SecretsUsedInArgOrEnv`).

## Kubernetes
- Resource `requests`/`limits` (CPU/mem); `livenessProbe` + `readinessProbe` (+`startupProbe` for slow ones).
- No "naked" Pods — a **Deployment** (a bare Pod won't be rescheduled when a node fails).
- `securityContext`: `runAsNonRoot: true`, a non-root UID, `allowPrivilegeEscalation: false` (the Restricted standard).
- Config — a `ConfigMap`; secrets — `Secret` objects, not plaintext in committed manifests. Namespaces.
- **Don't use the `:latest` tag in production** (hard to track the version/roll back; it silently forces `imagePullPolicy: Always`). Pin `vX.Y.Z`/digest.

## Traefik
- Routing from providers (labels/CRD), not manual static config. TLS via the ACME/Let's Encrypt certResolver, ACME storage on a shared volume, HTTP→HTTPS on `websecure`.
- Entrypoints (`web`:80, `websecure`:443) + middlewares (auth/ratelimit/headers, in declaration order).
- **Don't expose the dashboard/API insecurely** — no `--api.insecure=true` in production; `api@internal` behind `websecure`+TLS + basicAuth/forwardAuth.

## General
- Structured logs; zero secrets/PII in logs and images.
