import { ButtonsStore } from "../ButtonsStore";

import type { LineTagNameButtonsState } from "./LineTagNameButtonsStore-types";

const initialState: LineTagNameButtonsState = Object.seal({
	tagName: {
		isDisabled: true,
		values: new Set(["p"]),
	},
});

export class LineTagNameButtonsStore extends ButtonsStore<LineTagNameButtonsState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
