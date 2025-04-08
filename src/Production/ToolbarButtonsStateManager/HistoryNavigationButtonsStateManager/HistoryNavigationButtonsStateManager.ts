import type {
	HistoryBackToolbarButtonState,
	HistoryForwardToolbarButtonState,
} from "@components";

import type {
	UpdateHistoryBackStateFn,
	UpdateHistoryForwardStateFn,
	UpdateHistoryNavigationButtonsStateProps,
} from "./HistoryNavigationButtonsStateManager-types";

export class HistoryNavigationButtonsStateManager {
	#historyBack: HistoryBackToolbarButtonState = { isDisabled: true };
	#historyForward: HistoryForwardToolbarButtonState = { isDisabled: true };

	get historyBack() {
		return this.#historyBack;
	}

	get historyForward() {
		return this.#historyForward;
	}

	updateHistoryBackState: UpdateHistoryBackStateFn | null = null;
	updateHistoryForwardState: UpdateHistoryForwardStateFn | null = null;

	updateState({
		historyBack,
		historyForward,
	}: UpdateHistoryNavigationButtonsStateProps) {
		if (historyBack) {
			this.#historyBack = historyBack;
			this.updateHistoryBackState?.(historyBack);
		}

		if (historyForward) {
			this.#historyForward = historyForward;
			this.updateHistoryForwardState?.(historyForward);
		}
	}
}
