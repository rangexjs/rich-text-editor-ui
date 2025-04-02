import type {
	FormatLineTagNameButtonsStore,
	FormatStylesButtonsStore,
	HistoryNavigationButtonsStore,
	NodeInsertionButtonsStore,
	NonCategorizedOperationButtonsStore,
} from "@externalStores";
import type { ToolbarButtonsActionManager } from "@toolbarButtonsActionManager";

import type { EditorToolbarRows } from "../EditorToolbar";
import type { RichTextAreaWrapperProps } from "../RichTextAreaWrapper";

export type ToolbarButtons = EditorToolbarRows;

export interface AppProps extends RichTextAreaWrapperProps {
	toolbarButtons: ToolbarButtons;
	toolbarButtonsActionManager: ToolbarButtonsActionManager;
	formatLineTagNameButtonsStore: FormatLineTagNameButtonsStore;
	formatStylesButtonsStore: FormatStylesButtonsStore;
	historyNavigationButtonsStore: HistoryNavigationButtonsStore;
	nodeInsertionButtonsStore: NodeInsertionButtonsStore;
	nonCategorizedOperationButtonsStore: NonCategorizedOperationButtonsStore;
}
