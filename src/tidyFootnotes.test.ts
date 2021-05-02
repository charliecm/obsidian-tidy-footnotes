import * as CodeMirror from 'codemirror';
import { Editor, EditorCommand, EditorPosition, EditorRange, EditorSelection, EditorTransaction } from 'obsidian';
import tidyFootnotes from './tidyFootnotes';

class MockEditor implements Editor {
  doc: CodeMirror.Doc;
  constructor(text: string) {
    this.doc = CodeMirror.Doc(text);
  }
  
  getValue(): string {
    return this.doc.getValue();
  }
  getLine(line: number): string {
    return this.doc.getLine(line);
  }
  lineCount(): number {
    return this.doc.lineCount();
  }
  replaceRange(replacement: string, from: EditorPosition, to?: EditorPosition, origin?: string): void {
    this.doc.replaceRange(replacement, from, to, origin);
  }
  getDoc(): this { return this }
  refresh(): void {}
  setValue(content: string): void {}
  setLine(n: number, text: string): void {}
  lastLine(): number { return }
  getSelection(): string { return }
  somethingSelected(): boolean { return }
  getRange(from: EditorPosition, to: EditorPosition): string { return }
  replaceSelection(replacement: string): void {}
  getCursor(string?: 'from' | 'to' | 'head' | 'anchor'): EditorPosition { return }
  listSelections(): EditorSelection[] { return }
  setCursor(pos: number | EditorPosition, ch?: number): void {}
  setSelection(anchor: EditorPosition, head?: EditorPosition): void {}
  focus(): void {}
  blur(): void {}
  hasFocus(): boolean { return }
  getScrollInfo(): { top: number; left: number; } { return }
  scrollTo(x?: number, y?: number): void {}
  scrollIntoView(range: EditorRange, margin?: number): void {}
  undo(): void {}
  redo(): void {}
  exec(command: EditorCommand): void {}
  transaction(tx: EditorTransaction): void {}
  posToOffset(pos: EditorPosition): number { return }
  offsetToPos(offset: number): EditorPosition { return }
}

function getValue(text: string): string {
  let doc = new MockEditor(text);
  tidyFootnotes(doc);
  return doc.getValue().trim();
}

test('No footnotes should not change anything', () => {
  let value = getValue('Hello world!');
  expect(value).toBe('Hello world!');
});

test('Footnote markers without definitions should add empty definitions at the end', () => {
  let value = getValue('[^1][^2]');
  expect(value).toBe(`[^1][^2]

[^1]:
[^2]:`);
});

test('Footnotes should be re-numbered consecutively', () => {
  let value = getValue(`a[^1]b
[^3]c[^2]d

[^1]:
[^3]:
[^2]:`);
  expect(value).toBe(`a[^1]b
[^2]c[^3]d

[^1]:
[^2]:
[^3]:`);
});

test('Definitions without a marker should remain the same', () => {
  let value = getValue(`[^1]: A
[^2]: B`);
  expect(value).toBe(`[^1]: A
[^2]: B`);
});

test('Multi-line definitions should stay together', () => {
  let value = getValue(`Start
[^2]: A
\tB

\tC

End
[^1]: A
\tB`);
  expect(value).toBe(`Start
[^1]: A
\tB

\tC

[^2]: A
\tB
End`);
});