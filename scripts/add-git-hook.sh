#!/usr/bin/env bash

# Adds the git-hook described below. Appends to the hook file
# if it already exists or creates the file if it does not.
# Note: CWD must be inside target repository

HOOK_DIR=$(git rev-parse --show-toplevel)/.git/hooks
HOOK_FILE="$HOOK_DIR"/pre-commit
HOOK_SCRIPT_FILE="scripts/detect-secrets.sh"

# Force update pre-commit script file
echo "$(cat $HOOK_SCRIPT_FILE)" > "$HOOK_FILE"
chmod 700 "$HOOK_FILE"
echo "Created $HOOK_FILE"

