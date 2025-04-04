import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";

import { App } from "@components";
import { interactiveOverlayId } from "@constants";
import {
	AnchorOverlayStore,
	CaretListboxOverlayStore,
	FormatLineTagNameButtonsStore,
	FormatStylesButtonsStore,
	HistoryNavigationButtonsStore,
	NodeInsertionButtonsStore,
	NonCategorizedOperationButtonsStore,
	TableSettingsOverlayStore,
} from "@externalStores";
import { ToolbarButtonsActionManager } from "@toolbarButtonsActionManager";

// @ts-ignore
import inlineCss from "../global.css?inline";

import { getOverlayElement } from "./Utilities";

import type {
	OnFormatLineTagNameProps,
	OnFormatStylesProps,
	OnHistoryNavigationProps,
	OnNodeInsertionProps,
	OnNonCategorizedOperationProps,
	RichTextEditorUIConstructorProps,
	UpdateAnchorOverlayStateProps,
	UpdateCaretListboxOverlayStateProps,
	UpdateFormatLineTagNameButtonsProps,
	UpdateFormatStylesButtonsProps,
	UpdateHistoryNavigationButtonsProps,
	UpdateNodeInsertionButtonsProps,
	UpdateNonCategorizedOperationButtonsProps,
	UpdateTableSettingsOverlayStateProps,
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
	#anchorOverlayStore = new AnchorOverlayStore();
	#caretListboxOverlayStore = new CaretListboxOverlayStore();
	#tableSettingsOverlayStore = new TableSettingsOverlayStore();

	constructor({
		domNode,
		toolbarButtons,
		interactiveOverlays,
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

		flushSync(() => {
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
					interactiveOverlays={interactiveOverlays}
					anchorOverlayStore={this.#anchorOverlayStore}
					caretListboxOverlayStore={this.#caretListboxOverlayStore}
					tableSettingsOverlayStore={this.#tableSettingsOverlayStore}
					richTextArea={richTextArea}
				/>,
			);
		});
	}

	get shadowRoot() {
		return this.#shadowRoot;
	}

	get anchorOverlay() {
		const anchorOverlay = getOverlayElement({
			id: interactiveOverlayId.anchor,
			shadowRoot: this.#shadowRoot,
		});

		return anchorOverlay;
	}

	get caretListboxOverlay() {
		const caretListboxOverlay = getOverlayElement({
			id: interactiveOverlayId.caretListbox,
			shadowRoot: this.#shadowRoot,
		});

		return caretListboxOverlay;
	}

	get tableSettingsOverlay() {
		const tableSettingsOverlay = getOverlayElement({
			id: interactiveOverlayId.tableSettings,
			shadowRoot: this.#shadowRoot,
		});

		return tableSettingsOverlay;
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

	updateAnchorOverlayState(props: UpdateAnchorOverlayStateProps) {
		this.#anchorOverlayStore.updateState(props);
	}

	updateCaretListboxOverlayState(props: UpdateCaretListboxOverlayStateProps) {
		this.#caretListboxOverlayStore.updateState(props);
	}

	updateTableSettingsOverlayState(props: UpdateTableSettingsOverlayStateProps) {
		this.#tableSettingsOverlayStore.updateState(props);
	}

	unmount() {
		this.#root.unmount();
	}
}
