import type {
	FormatStylesButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type TextAlignIsDisabled = boolean;

export type TextAlignValues = Set<string>;

export interface TextAlignToolbarButtonState {
	isDisabled: TextAlignIsDisabled;
	values: TextAlignValues;
}

export type TextAlignType = "start" | "center" | "justify" | "end";

export type TextAlignList = TextAlignType[];

export type OnTextAlignClickProps = TextAlignType;

export interface TextAlignToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		FormatStylesButtonsStateManagerObj {}
