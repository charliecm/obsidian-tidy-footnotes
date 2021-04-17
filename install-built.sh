#!/usr/bin/env bash
VAULT="$1"
TARGET="$VAULT/.obsidian/plugins/open-with-optimage"
mkdir -p $TARGET
rm -f "$TARGET/main.js" "$TARGET/styles.css" "$TARGET/manifest.json"
if [[ $2 == "-d" ]]; then
  # Create symbolic links
  ln -s $(pwd)/main.js "$TARGET"
  ln -s $(pwd)/styles.css "$TARGET"
  ln -s $(pwd)/manifest.json "$TARGET"
  echo Linked plugin files to "$TARGET"
else
  # Copy built files once
  cp -f main.js styles.css manifest.json "$TARGET"
  echo Installed plugin files to "$TARGET"
fi