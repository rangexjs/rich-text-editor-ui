import { ButtonsStore } from "../ButtonsStore";

import type { ForamtLineTagNameButtonsState } from "./FormatLineTagNameButtonsStore-types";

const initialState: ForamtLineTagNameButtonsState = Object.seal({
	tagName: {
		isDisabled: true,
		values: new Set(["p"]),
	},
});

export class FormatLineTagNameButtonsStore extends ButtonsStore<ForamtLineTagNameButtonsState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
