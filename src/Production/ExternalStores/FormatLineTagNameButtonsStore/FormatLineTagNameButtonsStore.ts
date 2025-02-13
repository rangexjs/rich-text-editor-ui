import { ButtonsStore } from "../ButtonsStore";

import type { FormatLineTagNameButtonsState } from "./FormatLineTagNameButtonsStore-types";

const initialState: FormatLineTagNameButtonsState = Object.seal({
	tagName: {
		isDisabled: true,
		values: new Set(["p"]),
	},
});

export class FormatLineTagNameButtonsStore extends ButtonsStore<FormatLineTagNameButtonsState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
