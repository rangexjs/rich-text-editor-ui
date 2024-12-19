import type { FontFamilyValue } from "@components";

interface BackgroundColorState {
	isDisabled: boolean;
	values: Set<string>;
}

interface BoldState {
	isChecked: boolean;
	isDisabled: boolean;
}

interface ColorState {
	isDisabled: boolean;
	values: Set<string>;
}

interface FontFamilyState {
	isDisabled: boolean;
	values: Set<FontFamilyValue>;
}

interface FontSizeState {
	isDisabled: boolean;
	values: Set<`${string}px`>;
}

interface ItalicState {
	isChecked: boolean;
	isDisabled: boolean;
}

interface LetterSpacingState {
	isDisabled: boolean;
	values: Set<`${string}px`>;
}

interface StrikethroughState {
	isChecked: boolean;
	isDisabled: boolean;
}

interface UnderlineState {
	isChecked: boolean;
	isDisabled: boolean;
}

export interface FormattableButtonsState {
	backgroundColor: BackgroundColorState;
	bold: BoldState;
	color: ColorState;
	fontFamily: FontFamilyState;
	fontSize: FontSizeState;
	italic: ItalicState;
	letterSpacing: LetterSpacingState;
	strikethrough: StrikethroughState;
	underline: UnderlineState;
}
