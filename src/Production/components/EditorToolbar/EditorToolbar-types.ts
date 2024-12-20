import type { buttonsName } from "@constants";
import type {
	ForamtLineTagNameButtonsState,
	FormatStylesButtonsState,
	HistoryNavigationButtonsState,
	NodeInsertionButtonsState,
} from "@externalStores";
import type { ToolbarButtonsActionManager } from "@toolbarButtonsActionManager";

type ButtonsName = typeof buttonsName;

type ButtonsNameValues = ButtonsName[keyof ButtonsName];

type EditorToolbarRowGroup = ButtonsNameValues[];

type EditorToolbarRow = EditorToolbarRowGroup[];

export type EditorToolbarRows = EditorToolbarRow[];

export interface EditorToolbarProps {
	toolbarRows: EditorToolbarRows;
	toolbarButtonsActionManager: ToolbarButtonsActionManager;
	formatLineTagNameButtonsState: ForamtLineTagNameButtonsState;
	formatStylesButtonsState: FormatStylesButtonsState;
	historyNavigationButtonsState: HistoryNavigationButtonsState;
	nodeInsertionButtonsState: NodeInsertionButtonsState;
}
