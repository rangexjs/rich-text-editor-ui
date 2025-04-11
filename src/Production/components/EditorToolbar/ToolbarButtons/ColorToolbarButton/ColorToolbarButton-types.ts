import type {
	FormatStylesButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type ColorIsDisabled = boolean;

export type ColorValues = Set<string>;

export interface ColorToolbarButtonState {
	isDisabled: ColorIsDisabled;
	values: ColorValues;
}

export interface CreateColorPropsProps
	extends ToolbarButtonsActionManagerObj,
		FormatStylesButtonsStateManagerObj {}
