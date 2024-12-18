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

interface ItalicState {
	isChecked: boolean;
	isDisabled: boolean;
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
	italic: ItalicState;
	strikethrough: StrikethroughState;
	underline: UnderlineState;
}
