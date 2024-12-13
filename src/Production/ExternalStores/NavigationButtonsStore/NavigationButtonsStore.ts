import { ButtonsStore } from "../ButtonsStore";

import type { NavigationButtonsState } from "./NavigationButtonsStore-types";

const initialState: NavigationButtonsState = Object.seal({
	historyBack: { isDisabled: true },
	historyForward: { isDisabled: true },
});

export class NavigationButtonsStore extends ButtonsStore<NavigationButtonsState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
