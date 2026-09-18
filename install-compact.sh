#!/bin/bash
set -e

# Download and install the latest compact installer script
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh

# Update to version 0.31.0
~/.local/bin/compact update 0.31.0

# Add to PATH if not already present
if ! grep -q 'export PATH="$HOME/.local/bin:$PATH"' ~/.bashrc; then
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
fi

if [ -f ~/.zshrc ]; then
    if ! grep -q 'export PATH="$HOME/.local/bin:$PATH"' ~/.zshrc 2>/dev/null; then
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc 2>/dev/null || true
    fi
fi

echo "Done"
