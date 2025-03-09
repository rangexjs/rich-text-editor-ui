interface HistoryBackState {
	isDisabled: boolean;
}

interface HistoryForwardState {
	isDisabled: boolean;
}

export interface HistoryNavigationButtonsState {
	historyBack: HistoryBackState;
	historyForward: HistoryForwardState;
}
