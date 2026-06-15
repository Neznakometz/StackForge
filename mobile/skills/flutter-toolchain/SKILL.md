---
name: flutter-toolchain
description: Flutter development toolchain — running on an Android emulator / iOS simulator / device, environment checks, visual verification via screenshot. Apply when building, running, debugging on device, and setting up the environment (Android Studio / Xcode).
---

# Flutter toolchain (Android Studio / Xcode — via CLI)

The agent works with Android Studio and Xcode NOT by clicking, but through the CLI in Bash. The IDEs are needed as installed SDKs (Android SDK + emulators, Xcode + simulators), but control is via commands.

## Preflight (at the start)
- `flutter doctor` — check that these are green: Flutter, Android toolchain (Android Studio→SDK), Xcode (iOS), connected devices. Fix/escalate anything red before building.
- `flutter devices` — list of available devices/simulators.

## Android (Android Studio → SDK)
- Emulators: `flutter emulators` → `flutter emulators --launch <id>` (or `emulator -list-avds`). Devices: `adb devices`.
- Run: `flutter run -d <device>`. Build: `flutter build apk` / `flutter build appbundle` (release — see `flutter-release`).
- Native: `gradlew` in `android/`. Logs: `adb logcat`.
- **Screenshot for visual verification:** `adb -s <id> exec-out screencap -p > /tmp/and.png` → `Read` the file.

## iOS (Xcode)
- Simulators: `xcrun simctl list devices` → `xcrun simctl boot <id>`. Pods: `pod install` in `ios/`.
- Run: `flutter run -d <simulator>`. Signing/Team — in Xcode (automatic/manual), bundle id in App Store Connect ahead of time.
- **Screenshot:** `xcrun simctl io booted screenshot /tmp/ios.png` → `Read`.
- Release build: `flutter build ipa` (see `flutter-release`).

## Both at once
`flutter devices` → run on the Android emulator AND the iOS simulator, take screenshots of both, verify against the design spec / parity checklist (density, tap targets, states) in both themes. This is the mobile counterpart of web Playwright — visual verification without MCP.

## Rules
- Heavy commands (build/run/test/emulator) must be on the allow-list (`mobile/templates/settings.json`) — otherwise the agent will keep tripping over confirmations.
- No secrets/keystore/signing passwords in logs and commits.
- On a real low-end Android, verify 60fps for animations (profiler) — per the parity checklist.
