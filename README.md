# Obsidian Tidy Footnotes

Adds a command in [Obsidian](https://obsidian.md) that tidies your [footnotes](https://help.obsidian.md/How+to/Format+your+notes#Footnotes) so they're easy to follow:

- Consolidates all footnote definitions into one place, sorted by appearance
- Re-indexes numbered footnotes (e.g., `[^1][^4][^2]` becomes `[^1][^2][^3]`)

![Demo](https://raw.githubusercontent.com/charliecm/obsidian-tidy-footnotes/main/demo.gif)

Inspired by [obsidian-footnotes](https://github.com/akaalias/obsidian-footnotes) plugin.

## How to Install

From inside Obsidian:
1. Go to Settings → **Community plugins**.
2. Disable **Safe mode**.
3. Click **Browse**, search for **Tidy Footnotes**, and click **Install**.
4. Click the toggle button to enable the plugin.

For manual installation, download this repo and copy over `main.js` and `manifest.json` to your vault: `VaultFolder/.obsidian/plugins/tidy-footnotes/`.

## How to Use

Run `Tidy Footnotes: Tidy Footnotes` from the Command Palette. Or, set it as a hotkey from Settings → **Hotkeys**.

## Caveats

- Currently, footnotes in code blocks are also parsed instead of being ignored.
- The original positions of footnote definitions are not maintained. The plugin will always move all definitions to where the first definition is found.
- Non-numbered foonotes (e.g., `[^abc]`) doesn't affect the re-indexing of numbered footnotes.

## Development

1. Clone this repo.
2. `npm i` or `yarn` to install dependencies.
3. `npm run dev` to start compilation in watch mode.
4. `bash install-built.sh /path/to/your/vault -d` to create symbolic links of built files to your vault for quick development.
5. `npm run test` to run unit tests.

**Note:** [CodeMirror](https://github.com/codemirror/CodeMirror) is imported for testing with the `Doc` interface. It may break in the future if the version no longer matches what Obsidian uses.

## Release

1. Run `yarn build`.
2. Bump version in `manifest.json` and `versions.json`.
3. Add changes in `CHANGELOG.md`.
4. Add a new release in Github with the changelog texts and the built `main.js` and `manifest.json` attached.

## Support

If you really like this plugin and want to support its development, please consider [buying me a coffee](https://www.buymeacoffee.com/charliecm) 🙂 Thanks!

<a href="https://www.buymeacoffee.com/charliecm" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="217" height="60" /></a>
