import { ButtonsStore } from "../ButtonsStore";

import type { FormattableButtonsState } from "./FormattableButtonsStore-types";

const initialState: FormattableButtonsState = Object.seal({
	backgroundColor: { isDisabled: true, values: new Set() },
	bold: { isChecked: false, isDisabled: true },
	color: { isDisabled: true, values: new Set() },
	fontFamily: { isDisabled: true, values: new Set() },
	fontSize: { isDisabled: true, values: new Set() },
	italic: { isChecked: false, isDisabled: true },
	letterSpacing: { isDisabled: true, values: new Set() },
	strikethrough: { isChecked: false, isDisabled: true },
	underline: { isChecked: false, isDisabled: true },
});

export class FormattableButtonsStore extends ButtonsStore<FormattableButtonsState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
