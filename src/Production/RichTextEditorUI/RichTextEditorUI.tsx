import { createRoot } from "react-dom/client";

import { App } from "@components";
import {
	FormatLineTagNameButtonsStore,
	FormatStylesButtonsStore,
	HistoryNavigationButtonsStore,
	NodeInsertionButtonsStore,
	NonCategorizedOperationButtonsStore,
} from "@externalStores";
import { InteractiveOverlayManager } from "@interactiveOverlayManager";
import { ToolbarButtonsActionManager } from "@toolbarButtonsActionManager";

// @ts-ignore
import inlineCss from "../global.css?inline";

import type {
	OnFormatLineTagNameProps,
	OnFormatStylesProps,
	OnHistoryNavigationProps,
	OnNodeInsertionProps,
	OnNonCategorizedOperationProps,
	RichTextEditorUIConstructorProps,
	UpdateFormatLineTagNameButtonsProps,
	UpdateFormatStylesButtonsProps,
	UpdateHistoryNavigationButtonsProps,
	UpdateNodeInsertionButtonsProps,
	UpdateNonCategorizedOperationButtonsProps,
} from "./RichTextEditorUI-types";

export class RichTextEditorUI {
	#shadowRoot;
	#root;
	#toolbarButtonsActionManager = new ToolbarButtonsActionManager();
	#formatLineTagNameButtonsStore = new FormatLineTagNameButtonsStore();
	#formatStylesButtonsStore = new FormatStylesButtonsStore();
	#historyNavigationButtonsStore = new HistoryNavigationButtonsStore();
	#nodeInsertionButtonsStore = new NodeInsertionButtonsStore();
	#nonCategorizedOperationButtonsStore =
		new NonCategorizedOperationButtonsStore();
	#interactiveOverlayManager = new InteractiveOverlayManager();

	constructor({
		domNode,
		toolbarButtons,
		richTextArea,
	}: RichTextEditorUIConstructorProps) {
		const shadowRoot = domNode.attachShadow({ mode: "closed" });

		this.#shadowRoot = shadowRoot;

		const styleSheet = new CSSStyleSheet();

		styleSheet.replaceSync(inlineCss);

		this.#shadowRoot.adoptedStyleSheets.push(styleSheet);

		this.#root = createRoot(this.#shadowRoot);

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
				nonCategorizedOperationButtonsStore={
					this.#nonCategorizedOperationButtonsStore
				}
				richTextArea={richTextArea}
			/>,
		);
	}

	get shadowRoot() {
		return this.#shadowRoot;
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

	onNonCategorizedOperation(callback: OnNonCategorizedOperationProps) {
		this.#toolbarButtonsActionManager.onNonCategorizedOperation = callback;
	}

	updateFormatLineTagNameButtons(props: UpdateFormatLineTagNameButtonsProps) {
		this.#formatLineTagNameButtonsStore.updateState(props);
	}

	updateFormatStylesButtons(props: UpdateFormatStylesButtonsProps) {
		this.#formatStylesButtonsStore.updateState(props);
	}

	updateHistoryNavigationButtons(props: UpdateHistoryNavigationButtonsProps) {
		this.#historyNavigationButtonsStore.updateState(props);
	}

	updateNodeInsertionButtons(props: UpdateNodeInsertionButtonsProps) {
		this.#nodeInsertionButtonsStore.updateState(props);
	}

	updateNonCategorizedOperationButtons(
		props: UpdateNonCategorizedOperationButtonsProps,
	) {
		this.#nonCategorizedOperationButtonsStore.updateState(props);
	}

	get interactiveOverlay() {
		return this.#interactiveOverlayManager.interactiveOverlay;
	}

	unmount() {
		this.#root.unmount();
	}
}
