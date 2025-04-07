import type {
	FormatStylesButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type BackgroundColorIsDisabled = boolean;

export type BackgroundColorValues = Set<string>;

export interface BackgroundColorToolbarButtonState {
	isDisabled: BackgroundColorIsDisabled;
	values: BackgroundColorValues;
}

export interface CreateBackgroundColorPropsProps
	extends ToolbarButtonsActionManagerObj,
		FormatStylesButtonsStateManagerObj {}
