import type {
	FormatLineTagNameButtonsStore,
	FormatStylesButtonsStore,
	HistoryNavigationButtonsStore,
	NodeInsertionButtonsStore,
} from "@externalStores";
import type { ToolbarButtonsActionManager } from "src/Production/ToolbarButtonsActionManager";

import type { EditorToolbarRows } from "../EditorToolbar";

export type ToolbarButtons = EditorToolbarRows;

export interface AppProps {
	toolbarButtons: ToolbarButtons;
	toolbarButtonsActionManager: ToolbarButtonsActionManager;
	formatLineTagNameButtonsStore: FormatLineTagNameButtonsStore;
	formatStylesButtonsStore: FormatStylesButtonsStore;
	historyNavigationButtonsStore: HistoryNavigationButtonsStore;
	nodeInsertionButtonsStore: NodeInsertionButtonsStore;
	richTextArea: HTMLElement;
}
