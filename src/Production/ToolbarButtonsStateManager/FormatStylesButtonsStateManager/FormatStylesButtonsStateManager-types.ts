import type {
	BackgroundColorToolbarButtonState,
	BoldToolbarButtonState,
	ColorToolbarButtonState,
	FontFamilyToolbarButtonState,
	FontSizeToolbarButtonState,
	IndentationToolbarButtonState,
	ItalicToolbarButtonState,
	LetterSpacingToolbarButtonState,
	LineHeightToolbarButtonState,
	StrikethroughToolbarButtonState,
	TextAlignToolbarButtonState,
	UnderlineToolbarButtonState,
} from "@components";

export interface UpdateBackgroundColorStateProps
	extends BackgroundColorToolbarButtonState {}

export type UpdateBackgroundColorStateFn = (
	props: UpdateBackgroundColorStateProps,
) => void;

// Bold

export interface UpdateBoldStateProps extends BoldToolbarButtonState {}

export type UpdateBoldStateFn = (props: UpdateBoldStateProps) => void;

// Color
export interface UpdateColorStateProps extends ColorToolbarButtonState {}

export type UpdateColorStateFn = (props: UpdateColorStateProps) => void;

// FontFamily
export interface UpdateFontFamilyStateProps
	extends FontFamilyToolbarButtonState {}

export type UpdateFontFamilyStateFn = (
	props: UpdateFontFamilyStateProps,
) => void;

// FontSize

export interface UpdateFontSizeStateProps extends FontSizeToolbarButtonState {}

export type UpdateFontSizeStateFn = (props: UpdateFontSizeStateProps) => void;

// Indentation

export interface UpdateIndentationStateProps
	extends IndentationToolbarButtonState {}

export type UpdateIndentationStateFn = (
	props: UpdateIndentationStateProps,
) => void;

// Italic
export interface UpdateItalicStateProps extends ItalicToolbarButtonState {}

export type UpdateItalicStateFn = (props: UpdateItalicStateProps) => void;

// LetterSpacing
export interface UpdateLetterSpacingStateProps
	extends LetterSpacingToolbarButtonState {}

export type UpdateLetterSpacingStateFn = (
	props: UpdateLetterSpacingStateProps,
) => void;

// LineHeight
export interface UpdateLineHeightStateProps
	extends LineHeightToolbarButtonState {}

export type UpdateLineHeightStateFn = (
	props: UpdateLineHeightStateProps,
) => void;

// Strikethrough
export interface UpdateStrikethroughStateProps
	extends StrikethroughToolbarButtonState {}

export type UpdateStrikethroughStateFn = (
	props: UpdateStrikethroughStateProps,
) => void;

// TextAlign
export interface UpdateTextAlignStateProps
	extends TextAlignToolbarButtonState {}

export type UpdateTextAlignStateFn = (props: UpdateTextAlignStateProps) => void;

// Underline
export interface UpdateUnderlineStateProps
	extends UnderlineToolbarButtonState {}

export type UpdateUnderlineStateFn = (props: UpdateUnderlineStateProps) => void;

export interface FormatStylesButtonsState {
	backgroundColor: BackgroundColorToolbarButtonState;
	bold: BoldToolbarButtonState;
	color: ColorToolbarButtonState;
	fontFamily: FontFamilyToolbarButtonState;
	fontSize: FontSizeToolbarButtonState;
	indentation: IndentationToolbarButtonState;
	italic: ItalicToolbarButtonState;
	letterSpacing: LetterSpacingToolbarButtonState;
	lineHeight: LineHeightToolbarButtonState;
	strikethrough: StrikethroughToolbarButtonState;
	textAlign: TextAlignToolbarButtonState;
	underline: UnderlineToolbarButtonState;
}

export interface UpdateFormatStylesButtonsStateProps
	extends Partial<FormatStylesButtonsState> {}
