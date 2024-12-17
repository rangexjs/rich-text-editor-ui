import type {
	FormattableButtonsStore,
	InsertionButtonsStore,
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
	navigationButtonsStore: NavigationButtonsStore;
	richTextArea: HTMLElement;
}
