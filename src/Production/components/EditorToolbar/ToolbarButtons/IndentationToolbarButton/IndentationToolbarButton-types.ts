import type {
	FormatStylesButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type IndentationIsDisabled = boolean;

export type IndentationValues = Set<string>;

export interface IndentationToolbarButtonState {
	isDisabled: IndentationIsDisabled;
	values: IndentationValues;
}

export type OnIndentationClickProps = "remove" | number;

export interface IndentationToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		FormatStylesButtonsStateManagerObj {}
