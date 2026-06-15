---
name: flutter-security-a11y
description: Security and accessibility for a Flutter app — secure storage, secrets, cert pinning, obfuscation; Semantics, contrast, text scaling, screen readers. Apply when working with data storage, networking, authorization, and when building UI.
---

# Flutter — security and accessibility

## Security
- Secrets/tokens — `flutter_secure_storage` (iOS/macOS Keychain, Android Keystore), NOT `SharedPreferences`, NOT in code, NOT in logs.
  - iOS: `IOSOptions(accessibility: KeychainAccessibility.first_unlock)` for tokens needed by background tasks.
  - macOS/iOS: Keychain Sharing capability in `.entitlements`.
- Build config — `--dart-define` / `--dart-define-from-file`; do not bake keys into the binary (they get reversed).
- Networking — HTTPS only; never `badCertificateCallback => true`. Pinning against MITM: `SecurityContext(withTrustedRoots: false)` + `setTrustedCertificatesBytes()`, or a fingerprint check; keep fingerprints in config (rotation = config edit).
- Release — `--obfuscate --split-debug-info=<dir>` (keep symbols for de-obfuscating stack traces).
- OWASP Mobile baseline: no secrets in plaintext/logs, obfuscation, secure communications.

## Accessibility
- `Semantics(label:, button:, ...)` for meaning; `ExcludeSemantics`/`MergeSemantics` to clean up the tree; `SemanticsRole` on web.
- Text respects the system scale — the layout must not clip enlarged text (no fixed heights for text; test at a large scale).
- Text/control contrast ≥ 4.5:1.
- Every control is describable and understandable in TalkBack (Android) and VoiceOver (iOS) — verify on a real screen reader.
- Tap targets ≥ 48×48 (Android) / 44×44 (iOS) — enforce in widget tests (see `flutter-testing`).
