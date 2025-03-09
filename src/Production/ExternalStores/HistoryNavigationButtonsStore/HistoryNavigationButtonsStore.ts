import { ExternalStore } from "../ExternalStore";

import type { HistoryNavigationButtonsState } from "./HistoryNavigationButtonsStore-types";

const initialState: HistoryNavigationButtonsState = Object.seal({
	historyBack: { isDisabled: true },
	historyForward: { isDisabled: true },
});

export class HistoryNavigationButtonsStore extends ExternalStore<HistoryNavigationButtonsState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
