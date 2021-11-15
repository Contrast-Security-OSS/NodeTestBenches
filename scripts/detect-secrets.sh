#!/usr/bin/env bash

# Install detect-secrets if not found
if ! command -v detect-secrets &> /dev/null
then
    echo "detect-secrets could not be found. Installing detect-secrets..."
    if ! command -v pip3 &> /dev/null
    then
      pip install git+https://github.com/Contrast-Labs/detect-secrets
    else
      pip3 install git+https://github.com/Contrast-Labs/detect-secrets
    fi
fi

# Generate secrets baseline if not found
if [ -f ".secrets.baseline" ]; then
  FILES=$(git diff --cached --name-only --diff-filter=ACM)
  detect-secrets-hook --baseline .secrets.baseline "$FILES"
else
  echo "Warning: no .secrets.baseline found"
fi

# Install pre-commit if not found
if ! command -v pre-commit &> /dev/null
then
    echo "pre-commit could not be found. Installing detect-secrets..."
    if ! command -v brew &> /dev/null
    then
      pip install pre-commit
    else
      brew install pre-commit
    fi
fi

echo "[INFO] If you encounter any issues with detect-secrets, please refer to https://github.com/Contrast-Labs/detect-secrets"

pre-commit run

exit 0
