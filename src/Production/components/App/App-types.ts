import type { ToolbarButtonsActionManager } from "@toolbarButtonsActionManager";
import type {
	FormatLineTagNameButtonsStateManager,
	FormatStylesButtonsStateManager,
	HistoryNavigationButtonsStateManager,
	NodeInsertionButtonsStateManager,
	NonCategorizedOperationButtonsStateManager,
} from "@toolbarButtonsStateManager";

import type { EditorToolbarRows } from "../EditorToolbar";
import type { RichTextAreaWrapperProps } from "../RichTextAreaWrapper";

export type ToolbarButtons = EditorToolbarRows;

export interface AppProps extends RichTextAreaWrapperProps {
	toolbarButtons: ToolbarButtons;
	toolbarButtonsActionManager: ToolbarButtonsActionManager;
	formatLineTagNameButtonsStateManager: FormatLineTagNameButtonsStateManager;
	formatStylesButtonsStateManager: FormatStylesButtonsStateManager;
	historyNavigationButtonsStateManager: HistoryNavigationButtonsStateManager;
	nodeInsertionButtonsStateManager: NodeInsertionButtonsStateManager;
	nonCategorizedOperationButtonsStateManager: NonCategorizedOperationButtonsStateManager;
}
