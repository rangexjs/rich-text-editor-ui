import type { buttonsName } from "@constants";
import type {
	FormattableButtonsStore,
	InsertionButtonsStore,
	NavigationButtonsStore,
} from "@externalStores";
import type { ToolbarButtonsStateManager } from "@toolbarButtonsStateManager";

import type { EditorToolbarRows } from "../EditorToolbar";

type ButtonsName = (typeof buttonsName)[keyof typeof buttonsName];

export type EditorToolbarRowsName = EditorToolbarRows<ButtonsName>;

export interface AppProps {
	editorToolbar: EditorToolbarRowsName;
	toolbarStateManager: ToolbarButtonsStateManager;
	formattableButtonsStore: FormattableButtonsStore;
	insertionButtonsStore: InsertionButtonsStore;
	navigationButtonsStore: NavigationButtonsStore;
	richTextArea: HTMLElement;
}
