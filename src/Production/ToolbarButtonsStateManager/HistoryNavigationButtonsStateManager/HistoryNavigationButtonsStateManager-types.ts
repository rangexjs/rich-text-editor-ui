import type {
	HistoryBackToolbarButtonState,
	HistoryForwardToolbarButtonState,
} from "@components";

// HistoryBack
export interface UpdateHistoryBackStateProps
	extends HistoryBackToolbarButtonState {}

export type UpdateHistoryBackStateFn = (
	props: UpdateHistoryBackStateProps,
) => void;

// HistoryForward
export interface UpdateHistoryForwardStateProps
	extends HistoryForwardToolbarButtonState {}

export type UpdateHistoryForwardStateFn = (
	props: UpdateHistoryForwardStateProps,
) => void;

export interface HistoryNavigationButtonsState {
	historyBack: HistoryBackToolbarButtonState;
	historyForward: HistoryForwardToolbarButtonState;
}

export interface UpdateHistoryNavigationButtonsStateProps
	extends Partial<HistoryNavigationButtonsState> {}
