# GitLab CI / Ansible — rules
> Targets: GitLab (current) / Ansible (latest) · Source: docs.gitlab.com, docs.ansible.com · Updated: 2026-06-15

## GitLab CI
- `.gitlab-ci.yml` organized by stages; each job — `script:` or `trigger:`.
- **`rules:`**, not `only/except` (the latter are no longer developed, incompatible with `rules` in the same job).
- `needs:` — a DAG, jobs out of stage order (faster, fail fast).
- Cache vs artifacts: artifacts come only from successful jobs and are restored AFTER the cache (same path → the cache gets overwritten). Cache = reusable dependencies; artifacts = outputs/passing between jobs.
- Pin runner/job images by tag (not a floating `latest`).
- Secrets — CI/CD variables **Masked** (default) + **Protected** (only protected branches/tags).
- **Don't hardcode secrets in the config.** Masking is not a cure-all: with debug logging, masked variables are visible in the logs.

## Ansible
- **Idempotency** — modules instead of `command`/`shell`. If shell is unavoidable — `creates`/`removes` + `changed_when`/`failed_when`.
- Roles with the standard structure; the master playbook `site.yml` includes them.
- Inventory per environment (prod/staging) + `group_vars/`/`host_vars/`.
- `handlers` for restarts/reloads (triggered only by `notify`, at the end of the play) — don't restart unconditionally.
- Run `--check` (check mode) before applying. Playbooks/roles/inventory — in VCS.
- **Don't store plaintext secrets** — `ansible-vault`, `group_vars/<group>/vault`, variables prefixed `vault_`.
