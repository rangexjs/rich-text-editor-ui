import type {
	FormatStylesButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type FontSizeIsDisabled = boolean;

export type FontSizeValues = Set<string>;

export interface FontSizeToolbarButtonState {
	isDisabled: FontSizeIsDisabled;
	values: FontSizeValues;
}

export type OnFontSizeClickProps = "default" | number;

export interface FontSizeToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		FormatStylesButtonsStateManagerObj {}
