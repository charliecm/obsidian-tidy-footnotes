# Obsidian Footnotes Indexer

An [Obsidian](https://obsidian.md) plugin that adds a command for indexing your footnotes in their order of appearance with consecutive numbering.

## How to Install

From inside Obsidian…
1. Go to Settings → **Community plugins**.
2. Disable **Safe mode**.
3. Click **Browse**, search for **Footnotes Indexer**, and click **Install**.
4. Click the toggle to enable the plugin.

To install this plugin manually, download this repo and copy over `main.js`, `styles.css`, `manifest.json` to your vault: `VaultFolder/.obsidian/plugins/footnotes-indexer/`.

## Development

1. Clone this repo.
2. `npm i` or `yarn` to install dependencies.
3. `npm run dev` to start compilation in watch mode.
4. `bash install-built.sh /path/to/your/vault -d` to create symbolic links of built files to your vault for testing.

## Caveats

- The original footnote definition positions are not maintained. The plugin will always move all definitions to where the first definition is found.
- Non-numbered foonotes (`[^abc]) doesn't affect re-numbering of adjacent footnote markers when they're indexed.
- [CodeMirror](https://github.com/codemirror/CodeMirror) is imported for the unit tests. However, it may not match the version Obsidian uses in the future.

## Support

If you like this plugin and want to support its development, please consider [buying me a coffee](https://www.buymeacoffee.com/charliecm) 🙂 Thanks!

<a href="https://www.buymeacoffee.com/charliecm" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="217" height="60" /></a>
