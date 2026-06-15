---
name: flutter-release
description: Сборка и публикация Flutter-приложения в App Store и Google Play — build appbundle/ipa, подпись, обфускация, чеклисты сабмишена. Применять при подготовке релиза, бета-теста или выкладки в сторы.
---

# Flutter — релиз в сторы

Источник: docs.flutter.dev/deployment.

## Android (Google Play)
- Сборка: `flutter build appbundle` → `build/app/outputs/bundle/release/app-release.aab` (AAB — предпочтительный формат Play). R8-шринкер включён по умолчанию.
- Подпись: upload-keystore → `android/key.properties` + `signingConfigs` в `android/app/build.gradle`. **Keystore и пароли НЕ коммитить.** `applicationId`, `versionCode`/`versionName` из `pubspec version:`.
- Чеклист: ревизия манифеста/permissions, release-подпись, сборка AAB, загрузка в Play Console (Play App Signing).

## iOS (App Store)
- Сборка: `flutter build ipa` → `.xcarchive` в `build/ios/archive/`, `.ipa` в `build/ios/ipa/`.
- Подпись: в Xcode (Team, bundle id, provisioning); зарегистрируй bundle id в App Store Connect заранее.
- Сабмит: `.ipa` через Apple Transport / `xcrun altool` / Xcode Organizer → заполнить листинг в App Store Connect.

## Обязательно для обоих
- Обфускация: `--obfuscate --split-debug-info=<dir>`; символы сохранить для деобфускации стектрейсов.
- Бета: TestFlight (iOS) / закрытый трек (Android) → постепенный rollout (10→50→100%).
- Размер: следи за весом сборки (одна из целей миграции); арт-бюджет под контролем.

## CI/CD
fastlane / Codemagic / GitHub Actions — docs.flutter.dev/deployment/cd. AAB-путь для fastlane: `../build/app/outputs/bundle/release/app-release.aab`.
