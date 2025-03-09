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
	values: Set<string>;
}

interface FontSizeState {
	isDisabled: boolean;
	values: Set<string>;
}

interface IndentationState {
	isDisabled: boolean;
	values: Set<string>;
}

interface ItalicState {
	isChecked: boolean;
	isDisabled: boolean;
}

interface LetterSpacingState {
	isDisabled: boolean;
	values: Set<string>;
}

interface LineHeightState {
	isDisabled: boolean;
	values: Set<number>;
}

interface StrikethroughState {
	isChecked: boolean;
	isDisabled: boolean;
}

interface TextAlignState {
	isDisabled: boolean;
	values: Set<string>;
}

interface UnderlineState {
	isChecked: boolean;
	isDisabled: boolean;
}

export interface FormatStylesButtonsState {
	backgroundColor: BackgroundColorState;
	bold: BoldState;
	color: ColorState;
	fontFamily: FontFamilyState;
	fontSize: FontSizeState;
	indentation: IndentationState;
	italic: ItalicState;
	letterSpacing: LetterSpacingState;
	lineHeight: LineHeightState;
	strikethrough: StrikethroughState;
	textAlign: TextAlignState;
	underline: UnderlineState;
}
