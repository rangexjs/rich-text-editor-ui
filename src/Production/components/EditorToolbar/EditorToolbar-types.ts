import type { buttonsName } from "@constants";
import type {
	FormattableButtonsState,
	InsertionButtonsState,
	NavigationButtonsState,
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
	formattableButtonsState: FormattableButtonsState;
	insertionButtonsState: InsertionButtonsState;
	navigationButtonsState: NavigationButtonsState;
}
