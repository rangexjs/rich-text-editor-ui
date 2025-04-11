import type { ToolbarButtonsActionManager } from "@toolbarButtonsActionManager";
import type {
	FormatLineTagNameButtonsStateManager,
	FormatStylesButtonsStateManager,
	HistoryNavigationButtonsStateManager,
	NodeInsertionButtonsStateManager,
	NonCategorizedOperationButtonsStateManager,
} from "@toolbarButtonsStateManager";

export interface ToolbarButtonsActionManagerObj {
	toolbarButtonsActionManager: ToolbarButtonsActionManager;
}

export interface FormatLineTagNameButtonsStateManagerObj {
	formatLineTagNameButtonsStateManager: FormatLineTagNameButtonsStateManager;
}

export interface FormatStylesButtonsStateManagerObj {
	formatStylesButtonsStateManager: FormatStylesButtonsStateManager;
}

export interface HistoryNavigationButtonsStateManagerObj {
	historyNavigationStateManager: HistoryNavigationButtonsStateManager;
}

export interface NodeInsertionButtonsStateManagerObj {
	nodeInsertionButtonsStateManager: NodeInsertionButtonsStateManager;
}

export interface NonCategorizedOperationButtonsStateManagerObj {
	nonCategorizedOperationButtonsStateManager: NonCategorizedOperationButtonsStateManager;
}

export interface SetsAreEqualProps {
	setA: Set<unknown>;
	setB: Set<unknown>;
}

export type SetsAreaEqualReturn = boolean;
