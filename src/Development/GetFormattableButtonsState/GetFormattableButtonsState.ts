import type { FormatStylesButtonsState } from "@toolbarButtonsStateManager";

import type {
	GetFormattableButtonsStateProps,
	GetFormattableButtonsStateReturn,
} from "./GetFormattableButtonsState-types";

export const getFormattableButtonsState = ({
	formatStylesState,
}: GetFormattableButtonsStateProps): GetFormattableButtonsStateReturn => {
	const { fontStyle, fontWeight } = formatStylesState;

	const state: Partial<FormatStylesButtonsState> = {};

	if (fontStyle === "italic") {
		state.italic = { isChecked: true, isDisabled: false };
	}

	if (fontStyle === null) {
		state.italic = { isChecked: false, isDisabled: false };
	}

	if (fontWeight === "bold") {
		state.bold = { isChecked: true, isDisabled: false };
	}

	if (fontWeight === null) {
		state.bold = { isChecked: false, isDisabled: false };
	}

	return { formattableButtonsState: state };
};
