import type {
	HistoryNavigationButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type HistoryForwardIsDisabled = boolean;

export interface HistoryForwardToolbarButtonState {
	isDisabled: HistoryForwardIsDisabled;
}

export interface HistoryForwardToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		HistoryNavigationButtonsStateManagerObj {}
