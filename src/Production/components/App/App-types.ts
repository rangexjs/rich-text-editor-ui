import type {
	FormattableButtonsStore,
	InsertionButtonsStore,
	LineTagNameButtonsStore,
	NavigationButtonsStore,
} from "@externalStores";
import type { ToolbarButtonsActionManager } from "src/Production/ToolbarButtonsActionManager";

import type { EditorToolbarRows } from "../EditorToolbar";

export type ToolbarButtons = EditorToolbarRows;

export interface AppProps {
	toolbarButtons: ToolbarButtons;
	toolbarButtonsActionManager: ToolbarButtonsActionManager;
	formattableButtonsStore: FormattableButtonsStore;
	insertionButtonsStore: InsertionButtonsStore;
	lineTagNameButtonsStore: LineTagNameButtonsStore;
	navigationButtonsStore: NavigationButtonsStore;
	richTextArea: HTMLElement;
}
