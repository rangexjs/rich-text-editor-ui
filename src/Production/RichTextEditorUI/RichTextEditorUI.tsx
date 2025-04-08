import { StrictMode } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";

import { App } from "@components";
import { interactiveOverlayId } from "@constants";
import {
	AnchorOverlayStore,
	CaretListboxOverlayStore,
	TableSettingsOverlayStore,
} from "@externalStores";
import { ToolbarButtonsActionManager } from "@toolbarButtonsActionManager";
import {
	FormatLineTagNameButtonsStateManager,
	FormatStylesButtonsStateManager,
	HistoryNavigationButtonsStateManager,
	NodeInsertionButtonsStateManager,
	NonCategorizedOperationButtonsStateManager,
} from "@toolbarButtonsStateManager";

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
	#formatStylesButtonsStateManager = new FormatStylesButtonsStateManager();
	#formatLineTagNameButtonsStateManager =
		new FormatLineTagNameButtonsStateManager();
	#historyNavigationButtonsStateManager =
		new HistoryNavigationButtonsStateManager();
	#nodeInsertionButtonsStateManager = new NodeInsertionButtonsStateManager();
	#nonCategorizedOperationButtonsStateManager =
		new NonCategorizedOperationButtonsStateManager();
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
				<StrictMode>
					<App
						toolbarButtons={toolbarButtons}
						toolbarButtonsActionManager={this.#toolbarButtonsActionManager}
						formatLineTagNameButtonsStateManager={
							this.#formatLineTagNameButtonsStateManager
						}
						formatStylesButtonsStateManager={
							this.#formatStylesButtonsStateManager
						}
						historyNavigationButtonsStateManager={
							this.#historyNavigationButtonsStateManager
						}
						nodeInsertionButtonsStateManager={
							this.#nodeInsertionButtonsStateManager
						}
						nonCategorizedOperationButtonsStateManager={
							this.#nonCategorizedOperationButtonsStateManager
						}
						interactiveOverlays={interactiveOverlays}
						anchorOverlayStore={this.#anchorOverlayStore}
						caretListboxOverlayStore={this.#caretListboxOverlayStore}
						tableSettingsOverlayStore={this.#tableSettingsOverlayStore}
						richTextArea={richTextArea}
					/>
				</StrictMode>,
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
		this.#formatLineTagNameButtonsStateManager.updateState(props);
	}

	updateFormatStylesButtons(props: UpdateFormatStylesButtonsProps) {
		this.#formatStylesButtonsStateManager.updateState(props);
	}

	updateHistoryNavigationButtons(props: UpdateHistoryNavigationButtonsProps) {
		this.#historyNavigationButtonsStateManager.updateState(props);
	}

	updateNodeInsertionButtons(props: UpdateNodeInsertionButtonsProps) {
		this.#nodeInsertionButtonsStateManager.updateState(props);
	}

	updateNonCategorizedOperationButtons(
		props: UpdateNonCategorizedOperationButtonsProps,
	) {
		this.#nonCategorizedOperationButtonsStateManager.updateState(props);
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
