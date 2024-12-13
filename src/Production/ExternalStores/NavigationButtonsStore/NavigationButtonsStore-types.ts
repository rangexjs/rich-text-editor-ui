interface HistoryBackState {
	isDisabled: boolean;
}

interface HistoryForwardState {
	isDisabled: boolean;
}

export interface NavigationButtonsState {
	historyBack: HistoryBackState;
	historyForward: HistoryForwardState;
}

export interface NavigationUpdateStateProps
	extends Partial<NavigationButtonsState> {}
