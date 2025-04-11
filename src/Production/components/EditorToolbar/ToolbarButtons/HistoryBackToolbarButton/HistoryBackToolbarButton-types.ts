import type {
	HistoryNavigationButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type HistoryBackIsDisabled = boolean;

export interface HistoryBackToolbarButtonState {
	isDisabled: HistoryBackIsDisabled;
}

export interface HistoryBackToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		HistoryNavigationButtonsStateManagerObj {}
