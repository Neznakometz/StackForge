---
name: flutter-security-a11y
description: Безопасность и доступность Flutter-приложения — secure storage, секреты, cert pinning, obfuscation; Semantics, контраст, масштаб текста, screen readers. Применять при работе с хранением данных, сетью, авторизацией и при создании UI.
---

# Flutter — безопасность и доступность

## Безопасность
- Секреты/токены — `flutter_secure_storage` (iOS/macOS Keychain, Android Keystore), НЕ `SharedPreferences`, НЕ в коде, НЕ в логах.
  - iOS: `IOSOptions(accessibility: KeychainAccessibility.first_unlock)` для токенов, нужных фоновым задачам.
  - macOS/iOS: capability Keychain Sharing в `.entitlements`.
- Билд-конфиг — `--dart-define` / `--dart-define-from-file`; ключи в бинарь не зашивать (реверсятся).
- Сеть — только HTTPS; никогда `badCertificateCallback => true`. Pinning против MITM: `SecurityContext(withTrustedRoots: false)` + `setTrustedCertificatesBytes()`, либо проверка фингерпринта; фингерпринты — в конфиг (ротация = правка конфига).
- Релиз — `--obfuscate --split-debug-info=<dir>` (символы сохранить для деобфускации стектрейсов).
- OWASP Mobile база: нет секретов в плейнтексте/логах, обфускация, безопасные коммуникации.

## Доступность
- `Semantics(label:, button:, ...)` для смысла; `ExcludeSemantics`/`MergeSemantics` для чистки дерева; `SemanticsRole` на web.
- Текст уважает системный масштаб — layout не должен обрезать увеличенный шрифт (никаких фиксированных высот под текст; тестируй на большом масштабе).
- Контраст текста/контролов ≥ 4.5:1.
- Каждый контрол описуем и понятен в TalkBack (Android) и VoiceOver (iOS) — проверяй на реальном screen reader.
- Тап-таргеты ≥ 48×48 (Android) / 44×44 (iOS) — enforce в виджет-тестах (см. `flutter-testing`).
