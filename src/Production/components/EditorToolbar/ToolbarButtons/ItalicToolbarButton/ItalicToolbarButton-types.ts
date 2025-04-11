import type {
	FormatStylesButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type ItalicIsChecked = boolean;

export type ItalicIsDisabled = boolean;

export interface ItalicToolbarButtonState {
	isChecked: ItalicIsChecked;
	isDisabled: ItalicIsDisabled;
}

export interface ItalicToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		FormatStylesButtonsStateManagerObj {}
