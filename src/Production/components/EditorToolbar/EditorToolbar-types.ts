import type { buttonsName } from "@constants";
import type { ToolbarButtonsActionManager } from "@toolbarButtonsActionManager";
import type {
	FormatLineTagNameButtonsStateManager,
	FormatStylesButtonsStateManager,
	HistoryNavigationButtonsStateManager,
	NodeInsertionButtonsStateManager,
	NonCategorizedOperationButtonsStateManager,
} from "@toolbarButtonsStateManager";

type ButtonsName = typeof buttonsName;

type ButtonsNameValues = ButtonsName[keyof ButtonsName];

type EditorToolbarRowGroup = ButtonsNameValues[];

type EditorToolbarRow = EditorToolbarRowGroup[];

export type EditorToolbarRows = EditorToolbarRow[];

export interface EditorToolbarProps {
	toolbarRows: EditorToolbarRows;
	toolbarButtonsActionManager: ToolbarButtonsActionManager;
	formatLineTagNameButtonsStateManager: FormatLineTagNameButtonsStateManager;
	formatStylesButtonsStateManager: FormatStylesButtonsStateManager;
	historyNavigationButtonsStateManager: HistoryNavigationButtonsStateManager;
	nodeInsertionButtonsStateManager: NodeInsertionButtonsStateManager;
	nonCategorizedOperationButtonsStateManager: NonCategorizedOperationButtonsStateManager;
}
