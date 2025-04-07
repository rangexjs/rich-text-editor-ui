import type {
	FormatStylesButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type StrikethroughIsChecked = boolean;

export type StrikethroughIsDisabled = boolean;

export interface StrikethroughToolbarButtonState {
	isChecked: StrikethroughIsChecked;
	isDisabled: StrikethroughIsDisabled;
}

export interface StrikethroughToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		FormatStylesButtonsStateManagerObj {}
