import { Plugin, MarkdownView } from 'obsidian';
import indexFootnotes from './indexFootnotes';

export default class MyPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'index-footnotes',
			name: 'Index Footnotes',
			checkCallback: (checking: boolean) => {
				// Ensure active view is the Markdown editor
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (checking) return !!view;
				if (!view || view.sourceMode == undefined) return false;
				let doc = view.sourceMode.cmEditor;
				//@ts-ignore
				indexFootnotes(doc, CodeMirror);
			}
		});
	}
}
