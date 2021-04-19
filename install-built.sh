#!/usr/bin/env bash
VAULT="$1"
TARGET="$VAULT/.obsidian/plugins/tidy-footnotes"
mkdir -p $TARGET
rm -f "$TARGET/main.js" "$TARGET/manifest.json"
if [[ $2 == "-d" ]]; then
  # Create symbolic links
  ln -s $(pwd)/main.js "$TARGET"
  ln -s $(pwd)/manifest.json "$TARGET"
  echo Linked plugin files to "$TARGET"
else
  # Copy built files once
  cp -f main.js manifest.json "$TARGET"
  echo Installed plugin files to "$TARGET"
fi