import type { buttonsName } from "@constants";
import type {
	FormatLineTagNameButtonsState,
	HistoryNavigationButtonsState,
	NodeInsertionButtonsState,
	NonCategorizedOperationButtonsState,
} from "@externalStores";
import type { ToolbarButtonsActionManager } from "@toolbarButtonsActionManager";
import type { FormatStylesButtonsStateManager } from "@toolbarButtonsStateManager";

type ButtonsName = typeof buttonsName;

type ButtonsNameValues = ButtonsName[keyof ButtonsName];

type EditorToolbarRowGroup = ButtonsNameValues[];

type EditorToolbarRow = EditorToolbarRowGroup[];

export type EditorToolbarRows = EditorToolbarRow[];

export interface EditorToolbarProps {
	toolbarRows: EditorToolbarRows;
	toolbarButtonsActionManager: ToolbarButtonsActionManager;
	formatLineTagNameButtonsState: FormatLineTagNameButtonsState;
	formatStylesButtonsStateManager: FormatStylesButtonsStateManager;
	historyNavigationButtonsState: HistoryNavigationButtonsState;
	nodeInsertionButtonsState: NodeInsertionButtonsState;
	nonCategorizedOperationButtonsState: NonCategorizedOperationButtonsState;
}
