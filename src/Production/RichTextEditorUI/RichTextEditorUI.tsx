import { createRoot } from "react-dom/client";

import { App } from "@components";
import {
	FormatLineTagNameButtonsStore,
	FormatStylesButtonsStore,
	HistoryNavigationButtonsStore,
	NodeInsertionButtonsStore,
} from "@externalStores";
import { ToolbarButtonsActionManager } from "@toolbarButtonsActionManager";

// @ts-ignore
import inlineCss from "../global.css?inline";

import type {
	OnFormatLineTagNameProps,
	OnFormatStylesProps,
	OnHistoryNavigationProps,
	OnNodeInsertionProps,
	RichTextEditorUIConstructorProps,
	UpdateFormatLineTagNameButtonsProps,
	UpdateFormatStylesStylesButtonsProps,
	UpdateHistoryNavigationButtonsProps,
	UpdateNodeInsertionButtonsProps,
} from "./RichTextEditorUI-types";

export class RichTextEditorUI {
	#root;
	#toolbarButtonsActionManager = new ToolbarButtonsActionManager();
	#formatLineTagNameButtonsStore = new FormatLineTagNameButtonsStore();
	#formatStylesButtonsStore = new FormatStylesButtonsStore();
	#historyNavigationButtonsStore = new HistoryNavigationButtonsStore();
	#nodeInsertionButtonsStore = new NodeInsertionButtonsStore();

	constructor({
		domNode,
		toolbarButtons,
		richTextArea,
	}: RichTextEditorUIConstructorProps) {
		const shadowRoot = domNode.attachShadow({ mode: "closed" });

		const styleSheet = new CSSStyleSheet();

		styleSheet.replaceSync(inlineCss);

		shadowRoot.adoptedStyleSheets.push(styleSheet);

		this.#root = createRoot(shadowRoot);

		/**
		 * In development: Handle HMR updates manually
		 *
		 * HMR does not update the ?inline style changes automatically
		 */
		if (import.meta.hot) {
			import.meta.hot.accept("../global.css?inline", (module) => {
				if (!module) {
					throw new Error("Module can't be undefined.");
				}

				styleSheet.replaceSync(module.default);
			});
		}

		this.#root.render(
			<App
				toolbarButtons={toolbarButtons}
				toolbarButtonsActionManager={this.#toolbarButtonsActionManager}
				formatLineTagNameButtonsStore={this.#formatLineTagNameButtonsStore}
				formatStylesButtonsStore={this.#formatStylesButtonsStore}
				historyNavigationButtonsStore={this.#historyNavigationButtonsStore}
				nodeInsertionButtonsStore={this.#nodeInsertionButtonsStore}
				richTextArea={richTextArea}
			/>,
		);
	}

	onFormatLineTagName(callback: OnFormatLineTagNameProps) {
		this.#toolbarButtonsActionManager.onFormatLineTagName = callback;
	}

	onFormatStyles(callback: OnFormatStylesProps) {
		this.#toolbarButtonsActionManager.onFormatStyles = callback;
	}

	onHistoryNavigation(callback: OnHistoryNavigationProps) {
		this.#toolbarButtonsActionManager.onHistoryNavigation = callback;
	}

	onNodeInsertion(callback: OnNodeInsertionProps) {
		this.#toolbarButtonsActionManager.onNodeInsertion = callback;
	}

	updateFormatLineTagNameButtons(props: UpdateFormatLineTagNameButtonsProps) {
		this.#formatLineTagNameButtonsStore.updateState(props);
	}

	updateFormatStylesButtons(props: UpdateFormatStylesStylesButtonsProps) {
		this.#formatStylesButtonsStore.updateState(props);
	}

	updateHistoryNavigationButtons(props: UpdateHistoryNavigationButtonsProps) {
		this.#historyNavigationButtonsStore.updateState(props);
	}

	updateNodeInsertionButtons(props: UpdateNodeInsertionButtonsProps) {
		this.#nodeInsertionButtonsStore.updateState(props);
	}

	unmount() {
		this.#root.unmount();
	}
}
