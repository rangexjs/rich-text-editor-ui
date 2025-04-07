import type {
	FormatStylesButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type BoldIsChecked = boolean;

export type BoldIsDisabled = boolean;

export interface BoldToolbarButtonState {
	isChecked: BoldIsChecked;
	isDisabled: BoldIsDisabled;
}

export interface BoldToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		FormatStylesButtonsStateManagerObj {}
