import { Editor, MarkdownView, Plugin } from 'obsidian';
import tidyFootnotes from './tidyFootnotes';

export default class TidyFootnotes extends Plugin {
	async onload() {
		this.addCommand({
			id: 'tidy-footnotes',
			name: 'Tidy Footnotes',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				tidyFootnotes(editor);
			}
		});
	}
}
