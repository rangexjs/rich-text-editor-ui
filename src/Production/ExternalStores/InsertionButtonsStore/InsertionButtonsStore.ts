import { ButtonsStore } from "../ButtonsStore";

import type { InsertionButtonsState } from "./InsertionButtonsStore-types";

const initialState: InsertionButtonsState = Object.seal({
	anchor: { isDisabled: true },
	blockQuote: { isDisabled: true },
	codeBlock: { isDisabled: true },
	customComponent: { isDisabled: true },
	table: { isDisabled: true },
});

export class InsertionButtonsStore extends ButtonsStore<InsertionButtonsState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
