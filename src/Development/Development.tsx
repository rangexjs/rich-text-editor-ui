import { createRoot } from "react-dom/client";

import { RichTextEditor } from "src/Production";
import type { ToolbarButtons } from "src/Production/components";

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

	const toolbarButtons: ToolbarButtons = [
		[["history-back", "history-forward"]],
		[
			[
				"bold",
				"italic",
				"underline",
				"strikethrough",
				"color",
				"background-color",
			],
		],
	];

	const richTextEditor = new RichTextEditor({
		domNode: innerRoot,
		toolbarButtons,
		richTextArea,
	});

	// Set initial state
	setTimeout(() => {
		richTextEditor.updateFormattableStyles({
			backgroundColor: { isDisabled: false, values: new Set() },
			bold: { isChecked: true, isDisabled: false },
			color: { isDisabled: false, values: new Set() },
			italic: { isChecked: false, isDisabled: false },
			strikethrough: { isChecked: false, isDisabled: false },
			underline: { isChecked: false, isDisabled: false },
		});
	}, 0e3);

	richTextEditor.onFormatStylesChange((formatStylesState) => {
		const { formattableButtonsState } = getFormattableButtonsState({
			formatStylesState,
		});

		richTextEditor.updateFormattableStyles(formattableButtonsState);
	});
};
