import indexFootnotes from './indexFootnotes';
import * as CodeMirror from "codemirror";

function getValue(text: string): string {
  //@ts-ignore
  let doc = CodeMirror.Doc(text);
  indexFootnotes(doc, CodeMirror);
  return doc.getValue().trim();
}

test("No footnotes should not change anything", () => {
  let value = getValue("Hello world!");
  expect(value).toBe("Hello world!");
});

test("Footnote markers without definitions should add empty definitions at the end", () => {
  let value = getValue("[^1][^2]");
  expect(value).toBe(`[^1][^2]

[^1]:
[^2]:`);
});

test("Footnotes should be re-numbered consecutively", () => {
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

test("Definitions without a marker should remain the same", () => {
  let value = getValue(`[^1]: A
[^2]: B`);
  expect(value).toBe(`[^1]: A
[^2]: B`);
});

test("Multi-line definitions should stay together", () => {
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