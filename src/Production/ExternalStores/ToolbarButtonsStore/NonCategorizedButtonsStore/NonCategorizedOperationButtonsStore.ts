import { ExternalStore } from "../../ExternalStore";

import type { NonCategorizedOperationButtonsState } from "./NonCategorizedOperationButtonsStore-types";

const initialState: NonCategorizedOperationButtonsState = Object.seal({
	isTextAreaReadOnly: { isChecked: false },
});

export class NonCategorizedOperationButtonsStore extends ExternalStore<NonCategorizedOperationButtonsState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
