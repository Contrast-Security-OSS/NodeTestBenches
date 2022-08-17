#!/usr/bin/env bash

set -e

REMOTE=$1
REPOSITORY=$2
DIRECTORY=${3:-$1}

BRANCH="merge-$REMOTE"

git checkout main
git checkout -b "$BRANCH"

git remote add -f "$REMOTE" "git@github.com:Contrast-Security-OSS/$REPOSITORY.git"
git merge -s ours --no-commit --allow-unrelated-histories "$REMOTE/main"
git read-tree --prefix="$DIRECTORY/" -u "$REMOTE/main"
git commit -m "Merged subtree $DIRECTORY from $REPOSITORY"

git filter-repo --force --refs "$BRANCH" --path-rename=":$DIRECTORY/"
