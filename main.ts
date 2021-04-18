import { Plugin, MarkdownView } from 'obsidian';

const reKey = /\[\^(.+?(?=\]))\]/gi;
const reDefinition = /\[\^(.+)\]\:/;

/** An existing footnote key or definition. */
interface Marker {
	key: string
	line: number
	index?: number
	length?: number
	isDefinition: boolean
}

/** Footnote definition key and value. */
interface Definition {
	key: string,
	newKey: string
	isNumber: boolean
	value: string
}

// https://stackoverflow.com/a/1830844
function isNumeric(value: any): boolean {
	return !isNaN(value - parseFloat(value));
}

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
				let markers: Marker[] = [];
				let definitions = new Map<string, string>();
				let firstDefinitionLine = -1
				let definitionsIndexed = new Map<string, Definition>();

				// Iterate through each line
				const lineCount = doc.lineCount()
				for (let i = 0; i < lineCount; i++) {
					const line = doc.getLine(i);
					let isDefinition = false
					let match;

					// Look for footnote definition
					while ((match = reDefinition.exec(line)) !== null) {
						if (match.length < 1) return;
						isDefinition = true

						// Remember definition and where it is
						let key = match[1];
						let value = line.substring(match[0].length);
						definitions.set(key, value);
						let marker: Marker = {
							key,
							line: i,
							index: 0,
							isDefinition: true
						};
						markers.push(marker);

						// Remember first definition line to insert combined list later
						if (firstDefinitionLine === -1) {
							firstDefinitionLine = i
						}
						break;
					}
					if (isDefinition) continue;

					// Look for footnote key
					while ((match = reKey.exec(line)) !== null) {
						if (match.length < 1) return;

						// Remember where footnote key is
						let key = match[1];
						let marker: Marker = {
							key,
							line: i,
							index: match.index,
							length: match[0].length,
							isDefinition: false
						};
						markers.push(marker);
						
						if (!definitionsIndexed.has(key)) {
							// Add key into index
							definitionsIndexed.set(key, {
								key,
								newKey: key,
								isNumber: isNumeric(key),
								value: ''
							});
						}

						console.log(marker, definitionsIndexed);
					}
				}

				// Assign definition to key in index
				// If definition has no key, it will be appended with its current key
				definitions.forEach((value, key) => {
					definitionsIndexed.set(key, {
						key,
						newKey: key,
						isNumber: isNumeric(key),
						value
					});
				});

				// Re-index numbers and construct combined definitions output
				let count = 1;
				let definitionsStr = '';
				definitionsIndexed.forEach((definition, marker) => {
					let key = definition.key;
					if (definition.isNumber) {
						const current = definitionsIndexed.get(marker);
						key = count.toString();
						definitionsIndexed.set(marker, {
							...current,
							newKey: key
						});
						count++;
					}
					definitionsStr += `[^${key}]:${definition.value}\n`;
				});

				// console.log(markers, definitions, definitionsIndexed);

				const markersCount = markers.length;
				for (let i = markersCount - 1; i >= 0; i--) {
					const marker = markers[i];
					const markerLine = marker.line;
					if (marker.isDefinition) {
						if (markerLine === firstDefinitionLine) {
							// Replace first definition line with list of indexed definitions
							doc.replaceRange(definitionsStr, 
								{ line: markerLine, ch: 0 },
								{ line: markerLine + 1, ch: 0}
							);
							continue;
						}
						// Remove line
						doc.replaceRange('', 
							{ line: markerLine, ch: 0 },
							{ line: markerLine + 1, ch: 0}
						);
						continue;
					}

					// Check if key has changed
					const definition = definitionsIndexed.get(marker.key);
					const newKey = definition.newKey
					if (marker.key === newKey) continue;

					// Replace footnote key in line with the new one
					const line = doc.getLine(markerLine);
					const prefix = line.substring(0, marker.index);
					const newMarker = `[^${newKey}]`;
					const suffix = line.substr(marker.index + marker.length);
					const newLine = prefix + newMarker + suffix;
					doc.replaceRange(newLine, 
						{ line: markerLine, ch: 0 },
						{ line: markerLine, ch: Infinity }
					);
				}

				if (firstDefinitionLine == -1) {
					// If there are no definitions, add definitions list at the end
					const lineCount = doc.lineCount();
					console.log(lineCount, definitionsStr);
					doc.replaceRange("\n\n" + definitionsStr, 
						{ line: lineCount, ch: 0 },
						{ line: lineCount, ch: Infinity}
					);
				}
			}
		});
	}
}
