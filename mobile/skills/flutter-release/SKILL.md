---
name: flutter-release
description: Building and publishing a Flutter app to the App Store and Google Play — build appbundle/ipa, signing, obfuscation, submission checklists. Apply when preparing a release, a beta test, or a store rollout.
---

# Flutter — release to the stores

Source: docs.flutter.dev/deployment.

## Android (Google Play)
- Build: `flutter build appbundle` → `build/app/outputs/bundle/release/app-release.aab` (AAB — the preferred Play format). R8 shrinker is on by default.
- Signing: upload-keystore → `android/key.properties` + `signingConfigs` in `android/app/build.gradle`. **Do NOT commit the keystore and passwords.** `applicationId`, `versionCode`/`versionName` from `pubspec version:`.
- Checklist: review the manifest/permissions, release signing, build the AAB, upload to Play Console (Play App Signing).

## iOS (App Store)
- Build: `flutter build ipa` → `.xcarchive` in `build/ios/archive/`, `.ipa` in `build/ios/ipa/`.
- Signing: in Xcode (Team, bundle id, provisioning); register the bundle id in App Store Connect ahead of time.
- Submit: `.ipa` via Apple Transport / `xcrun altool` / Xcode Organizer → fill in the listing in App Store Connect.

## Required for both
- Obfuscation: `--obfuscate --split-debug-info=<dir>`; keep symbols for de-obfuscating stack traces.
- Beta: TestFlight (iOS) / closed track (Android) → gradual rollout (10→50→100%).
- Size: watch the build weight (one of the migration goals); keep the art budget under control.

## CI/CD
fastlane / Codemagic / GitHub Actions — docs.flutter.dev/deployment/cd. AAB path for fastlane: `../build/app/outputs/bundle/release/app-release.aab`.
