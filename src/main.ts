import { Plugin, MarkdownView } from 'obsidian';
import tidyFootnotes from './tidyFootnotes';

export default class TidyFootnotes extends Plugin {
	async onload() {
		this.addCommand({
			id: 'tidy-footnotes',
			name: 'Tidy Footnotes',
			checkCallback: (checking: boolean) => {
				// Ensure the active view is a Markdown editor
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (checking) return !!view;
				if (!view || view.sourceMode == undefined) return false;
				let doc = view.sourceMode.cmEditor;
				//@ts-ignore (use the global CodeMirror instance provided by Obsidian)
				tidyFootnotes(doc, CodeMirror);
			}
		});
	}
}
