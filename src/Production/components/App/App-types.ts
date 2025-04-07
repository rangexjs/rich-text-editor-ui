import type {
	FormatLineTagNameButtonsStore,
	HistoryNavigationButtonsStore,
	NodeInsertionButtonsStore,
	NonCategorizedOperationButtonsStore,
} from "@externalStores";
import type { ToolbarButtonsActionManager } from "@toolbarButtonsActionManager";
import type { FormatStylesButtonsStateManager } from "@toolbarButtonsStateManager";

import type { EditorToolbarRows } from "../EditorToolbar";
import type { RichTextAreaWrapperProps } from "../RichTextAreaWrapper";

export type ToolbarButtons = EditorToolbarRows;

export interface AppProps extends RichTextAreaWrapperProps {
	toolbarButtons: ToolbarButtons;
	toolbarButtonsActionManager: ToolbarButtonsActionManager;
	formatLineTagNameButtonsStore: FormatLineTagNameButtonsStore;
	formatStylesButtonsStateManager: FormatStylesButtonsStateManager;
	historyNavigationButtonsStore: HistoryNavigationButtonsStore;
	nodeInsertionButtonsStore: NodeInsertionButtonsStore;
	nonCategorizedOperationButtonsStore: NonCategorizedOperationButtonsStore;
}
