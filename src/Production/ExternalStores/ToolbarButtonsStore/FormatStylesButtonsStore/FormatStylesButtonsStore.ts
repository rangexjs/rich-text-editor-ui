import { ExternalStore } from "../../ExternalStore";

import type { FormatStylesButtonsState } from "./FormatStylesButtonsStore-types";

const initialState: FormatStylesButtonsState = Object.seal({
	backgroundColor: { isDisabled: true, values: new Set() },
	bold: { isChecked: false, isDisabled: true },
	color: { isDisabled: true, values: new Set() },
	fontFamily: { isDisabled: true, values: new Set() },
	fontSize: { isDisabled: true, values: new Set() },
	indentation: { isDisabled: true, values: new Set() },
	italic: { isChecked: false, isDisabled: true },
	letterSpacing: { isDisabled: true, values: new Set() },
	lineHeight: { isDisabled: true, values: new Set() },
	strikethrough: { isChecked: false, isDisabled: true },
	textAlign: { isDisabled: true, values: new Set() },
	underline: { isChecked: false, isDisabled: true },
});

export class FormatStylesButtonsStore extends ExternalStore<FormatStylesButtonsState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
