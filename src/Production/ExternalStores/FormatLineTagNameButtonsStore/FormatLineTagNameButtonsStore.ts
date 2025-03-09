import { ExternalStore } from "../ExternalStore";

import type { FormatLineTagNameButtonsState } from "./FormatLineTagNameButtonsStore-types";

const initialState: FormatLineTagNameButtonsState = Object.seal({
	tagName: {
		isDisabled: true,
		values: new Set(["p"]),
	},
});

export class FormatLineTagNameButtonsStore extends ExternalStore<FormatLineTagNameButtonsState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
