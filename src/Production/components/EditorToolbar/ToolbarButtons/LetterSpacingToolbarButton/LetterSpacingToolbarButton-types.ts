import type {
	FormatStylesButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type LetterSpacingIsDisabled = boolean;

export type LetterSpacingValues = Set<string>;

export interface LetterSpacingToolbarButtonState {
	isDisabled: LetterSpacingIsDisabled;
	values: LetterSpacingValues;
}

export type OnLetterSpacingClickProps = "default" | number;

export interface LetterSpacingToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		FormatStylesButtonsStateManagerObj {}
