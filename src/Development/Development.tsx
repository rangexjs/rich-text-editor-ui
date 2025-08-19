import { createRoot } from "react-dom/client";

import { RichTextEditorUI } from "src/Production";
import type { ToolbarButtons } from "src/Production/components";

import { getFormattableButtonsState } from "./GetFormattableButtonsState";
import { mentionList } from "./StaticData";
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
		[
			["history-back", "history-forward"],
			[
				"table",
				"list",
				"todo-list",
				"block-quote",
				"code-block",
				"image",
				"anchor",
				"symbols",
			],
			["is-text-area-read-only"],
		],
		[
			["line-tag-name"],
			[
				"bold",
				"italic",
				"underline",
				"strikethrough",
				"color",
				"background-color",
				"font-family",
				"font-size",
				"letter-spacing",
				"remove-format",
			],
			["text-align", "line-height", "indentation"],
		],
	];

	const richTextEditorUI = new RichTextEditorUI({
		domNode: innerRoot,
		toolbarButtons,
		interactiveOverlays: {
			anchor: true,
			caretListbox: true,
			floatingControls: true,
			tableSettings: true,
		},
		richTextArea,
	});

	// Set initial state
	setTimeout(() => {
		richTextEditorUI.updateFormatStylesButtons({
			backgroundColor: {
				isDisabled: false,
				values: new Set([
					"#ccc",
					"rgba(250, 250, 0, 1)",
					"rgb(100, 200, 50, 0.2)",
					"rgb(100, 100, 50, .2)",
					"rgba(100, 100, 50, .2)",
				]),
			},
			bold: { isChecked: true, isDisabled: false },
			color: { isDisabled: false, values: new Set() },
			fontFamily: {
				isDisabled: false,
				values: new Set(["Arial", "Times New Roman"]),
			},
			fontSize: {
				isDisabled: false,
				values: new Set(["16px", "24px", "28px"]),
			},
			indentation: {
				isDisabled: false,
				values: new Set(["10px, 3px"]),
			},
			italic: { isChecked: false, isDisabled: false },
			letterSpacing: {
				isDisabled: false,
				values: new Set(["-1px", "4px", "8.5px"]),
			},
			lineHeight: {
				isDisabled: false,
				values: new Set([1, 1.2, 2, 4, -1, -3.1]),
			},
			strikethrough: { isChecked: false, isDisabled: false },
			textAlign: { isDisabled: false, values: new Set(["start", "center"]) },
			underline: { isChecked: false, isDisabled: false },
		});

		richTextEditorUI.updateFormatLineTagNameButtons({
			lineTagName: { isDisabled: false, values: new Set(["p"]) },
		});
	}, 0e3);

	richTextEditorUI.updateNodeInsertionButtons({
		anchor: { isChecked: false, isDisabled: false },
		blockQuote: { isDisabled: false },
		codeBlock: { isDisabled: false },
		image: { isDisabled: false },
		list: { isDisabled: false },
		symbols: { isDisabled: false },
		table: { isDisabled: false },
		todoList: { isDisabled: false },
	});

	richTextEditorUI.updateHistoryNavigationButtons({
		historyBack: { isDisabled: false },
		historyForward: { isDisabled: false },
	});

	richTextEditorUI.onFormatStyles((formatStylesState) => {
		console.log(formatStylesState);

		const { formattableButtonsState } = getFormattableButtonsState({
			formatStylesState,
		});

		richTextEditorUI.updateFormatStylesButtons(formattableButtonsState);
	});

	richTextEditorUI.onNodeInsertion((props) => {
		console.log(props);
	});

	richTextEditorUI.onNonCategorizedOperation((props) => {
		console.log(props);
	});

	// Feature flags (should be reworked in the future to make manual testing easier, consider storybook)
	const isAddAnchor = false;
	const isAddCaretListbox = false;
	const isAddFloatingControls = false;
	const isAddTable = true;

	if (isAddAnchor) {
		const { anchorOverlay } = richTextEditorUI;

		anchorOverlay.style.top = "anchor(bottom)";
		anchorOverlay.style.left = "anchor(left)";

		setTimeout(() => {
			// @ts-ignore
			anchorOverlay.showPopover({ source: richTextArea });
		}, 1e3);
	}

	if (isAddCaretListbox) {
		const { caretListboxOverlay } = richTextEditorUI;

		caretListboxOverlay.style.top = "anchor(bottom)";
		caretListboxOverlay.style.left = "anchor(left)";

		richTextEditorUI.updateCaretListboxOverlay({
			mentionSearch: "@",
			mentionList,
		});

		setTimeout(() => {
			// @ts-ignore
			caretListboxOverlay.showPopover({ source: richTextArea });
		}, 1e3);
	}

	if (isAddFloatingControls) {
		const { floatingControlsOverlay } = richTextEditorUI;

		richTextEditorUI.updateFloatingControlsOverlay({ copy: true, drag: true });

		setTimeout(() => {
			// @ts-ignore
			floatingControlsOverlay.showPopover({ source: richTextArea });
		}, 1e2);
	}

	if (isAddTable) {
		const { tableSettingsOverlay } = richTextEditorUI;

		tableSettingsOverlay.style.top = "anchor(bottom)";
		tableSettingsOverlay.style.left = "anchor(left)";

		setTimeout(() => {
			// @ts-ignore
			tableSettingsOverlay.showPopover({ source: richTextArea });
		}, 1e3);
	}
};
