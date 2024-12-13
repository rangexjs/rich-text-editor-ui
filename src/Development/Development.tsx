import { createRoot } from "react-dom/client";

import { RichTextEditor } from "src/Production";
import type { EditorToolbarRowsName } from "src/Production/components";

import { getFormattableButtonsState } from "./GetFormattableButtonsState";
import { DevelopmentView } from "./components";

import type { SimulateProductEnvironmentProps } from "./Development-types";

export const simulateProductEnvironment = ({
	domNode,
}: SimulateProductEnvironmentProps) => {
	const root = createRoot(domNode);

	const innerRoot = document.createElement("div");

	root.render(<DevelopmentView innerRoot={innerRoot} />);

	const richTextArea = document.createElement("div");

	richTextArea.textContent = "Text of the Rich Text Area.";

	const editorToolbar: EditorToolbarRowsName = [
		[["history-back", "history-forward"]],
		[["bold", "italic", "color", "background-color"]],
	];

	const richTextEditor = new RichTextEditor({
		domNode: innerRoot,
		editorToolbar,
		richTextArea,
	});

	// Set initial state
	setTimeout(() => {
		richTextEditor.updateFormattableStyles({
			bold: { isChecked: true, isDisabled: false },
			italic: { isChecked: false, isDisabled: false },
		});
	}, 2e3);

	richTextEditor.onFormatStylesChange((formatStylesState) => {
		const { formattableButtonsState } = getFormattableButtonsState({
			formatStylesState,
		});

		richTextEditor.updateFormattableStyles(formattableButtonsState);
	});
};
