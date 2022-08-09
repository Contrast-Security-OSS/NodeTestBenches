#!/usr/bin/env bash

if [[ -n "$CI" ]]; then
  npx husky install

  # Install detect-secrets if not found
  if ! command -v detect-secrets &>/dev/null; then
    echo "detect-secrets could not be found. Installing detect-secrets..."
    if ! command -v pip3 &>/dev/null; then
      pip install git+https://github.com/Contrast-Labs/detect-secrets
    else
      pip3 install git+https://github.com/Contrast-Labs/detect-secrets
    fi
  fi

  # Install pre-commit if not found
  if ! command -v pre-commit &>/dev/null; then
    echo "pre-commit could not be found. Installing detect-secrets..."
    if ! command -v brew &>/dev/null; then
      if ! command -v pip3 &>/dev/null; then
        pip install pre-commit
      else
        pip3 install pre-commit
      fi
    else
      brew install pre-commit
    fi
  fi
fi

npx lerna bootstrap --ci --force-local
