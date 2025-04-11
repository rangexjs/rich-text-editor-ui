import type {
	FormatStylesButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type UnderlineIsDisabled = boolean;

export type UnderlineIsChecked = boolean;

export interface UnderlineToolbarButtonState {
	isChecked: UnderlineIsChecked;
	isDisabled: UnderlineIsDisabled;
}

export interface UnderlineToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		FormatStylesButtonsStateManagerObj {}
