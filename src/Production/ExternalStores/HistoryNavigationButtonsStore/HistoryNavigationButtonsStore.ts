import { ButtonsStore } from "../ButtonsStore";

import type { HistoryNavigationButtonsState } from "./HistoryNavigationButtonsStore-types";

const initialState: HistoryNavigationButtonsState = Object.seal({
	historyBack: { isDisabled: true },
	historyForward: { isDisabled: true },
});

export class HistoryNavigationButtonsStore extends ButtonsStore<HistoryNavigationButtonsState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
