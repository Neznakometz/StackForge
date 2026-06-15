#!/usr/bin/env node
// PreCompact: a reminder to save progress before context compaction.
// No network, no side effects. Always exit 0.
"use strict";
process.stdout.write(
  "[Reminder before /compact] Record progress: update PROGRESS.md " +
    "(task, status, commit) and run /checkpoint if needed. " +
    "Compact only the conversation history; persist progress facts to files.\n"
);
process.exit(0);
