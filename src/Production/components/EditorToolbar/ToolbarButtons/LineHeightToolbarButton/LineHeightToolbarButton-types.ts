import type {
	FormatStylesButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type LineHeightIsDisabled = boolean;

export type LineHeightValues = Set<number>;

export interface LineHeightToolbarButtonState {
	isDisabled: LineHeightIsDisabled;
	values: LineHeightValues;
}

export type OnLineHeightClickProps = "default" | number;

export interface LineHeightToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		FormatStylesButtonsStateManagerObj {}
