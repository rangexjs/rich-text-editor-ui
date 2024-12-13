import { createRoot } from "react-dom/client";

import { App } from "@components";
import {
	FormattableButtonsStore,
	InsertionButtonsStore,
	NavigationButtonsStore,
} from "@externalStores";
import { ToolbarButtonsStateManager } from "@toolbarButtonsStateManager";

// @ts-ignore
import inlineCss from "../global.css?inline";

import type {
	OnFormatStylesChangeProps,
	OnNavigationChangeProps,
	RichTextEditorConstructorProps,
	UpdateFormattableStylesProps,
} from "./RichTextEditor-types";

export class RichTextEditor {
	#root;
	#toolbarStateManager = new ToolbarButtonsStateManager();
	#formattableButtonsStore = new FormattableButtonsStore();
	#insertionButtonsStore = new InsertionButtonsStore();
	#navigationButtonsStore = new NavigationButtonsStore();

	constructor({
		domNode,
		editorToolbar,
		richTextArea,
	}: RichTextEditorConstructorProps) {
		const shadowRoot = domNode.attachShadow({ mode: "closed" });

		const styleSheet = new CSSStyleSheet();

		styleSheet.replaceSync(inlineCss);

		shadowRoot.adoptedStyleSheets.push(styleSheet);

		this.#root = createRoot(shadowRoot);

		this.#root.render(
			<App
				editorToolbar={editorToolbar}
				toolbarStateManager={this.#toolbarStateManager}
				formattableButtonsStore={this.#formattableButtonsStore}
				insertionButtonsStore={this.#insertionButtonsStore}
				navigationButtonsStore={this.#navigationButtonsStore}
				richTextArea={richTextArea}
			/>,
		);
	}

	onFormatStylesChange(callback: OnFormatStylesChangeProps) {
		this.#toolbarStateManager.onFormatStylesChange = callback;
	}

	onNavigationChange(callback: OnNavigationChangeProps) {
		this.#toolbarStateManager.onNavigationChange = callback;
	}

	updateFormattableStyles(props: UpdateFormattableStylesProps) {
		this.#formattableButtonsStore.updateState(props);
	}

	unmount() {
		this.#root.unmount();
	}
}
