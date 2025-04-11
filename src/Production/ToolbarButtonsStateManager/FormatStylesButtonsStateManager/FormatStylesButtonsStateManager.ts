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

import type {
	UpdateBackgroundColorStateFn,
	UpdateBoldStateFn,
	UpdateColorStateFn,
	UpdateFontFamilyStateFn,
	UpdateFontSizeStateFn,
	UpdateFormatStylesButtonsStateProps,
	UpdateIndentationStateFn,
	UpdateItalicStateFn,
	UpdateLetterSpacingStateFn,
	UpdateLineHeightStateFn,
	UpdateStrikethroughStateFn,
	UpdateTextAlignStateFn,
	UpdateUnderlineStateFn,
} from "./FormatStylesButtonsStateManager-types";

export class FormatStylesButtonsStateManager {
	#backgroundColor: BackgroundColorToolbarButtonState = {
		isDisabled: true,
		values: new Set(),
	};
	#bold: BoldToolbarButtonState = { isChecked: false, isDisabled: true };
	#color: ColorToolbarButtonState = { isDisabled: true, values: new Set() };
	#fontFamily: FontFamilyToolbarButtonState = {
		isDisabled: true,
		values: new Set(),
	};
	#fontSize: FontSizeToolbarButtonState = {
		isDisabled: true,
		values: new Set(),
	};
	#indentation: IndentationToolbarButtonState = {
		isDisabled: true,
		values: new Set(),
	};
	#italic: ItalicToolbarButtonState = { isChecked: false, isDisabled: true };
	#letterSpacing: LetterSpacingToolbarButtonState = {
		isDisabled: true,
		values: new Set(),
	};
	#lineHeight: LineHeightToolbarButtonState = {
		isDisabled: true,
		values: new Set(),
	};
	#strikethrough: StrikethroughToolbarButtonState = {
		isChecked: false,
		isDisabled: true,
	};
	#textAlign: TextAlignToolbarButtonState = {
		isDisabled: true,
		values: new Set(),
	};
	#underline: UnderlineToolbarButtonState = {
		isChecked: false,
		isDisabled: true,
	};

	get backgroundColor() {
		return this.#backgroundColor;
	}

	get bold() {
		return this.#bold;
	}

	get color() {
		return this.#color;
	}

	get fontFamily() {
		return this.#fontFamily;
	}

	get fontSize() {
		return this.#fontSize;
	}

	get indentation() {
		return this.#indentation;
	}

	get italic() {
		return this.#italic;
	}

	get letterSpacing() {
		return this.#letterSpacing;
	}

	get lineHeight() {
		return this.#lineHeight;
	}

	get strikethrough() {
		return this.#strikethrough;
	}

	get textAlign() {
		return this.#textAlign;
	}

	get underline() {
		return this.#underline;
	}

	updateBackgroundColorState: UpdateBackgroundColorStateFn | null = null;
	updateBoldState: UpdateBoldStateFn | null = null;
	updateColorState: UpdateColorStateFn | null = null;
	updateFontFamilyState: UpdateFontFamilyStateFn | null = null;
	updateFontSizeState: UpdateFontSizeStateFn | null = null;
	updateIndentationState: UpdateIndentationStateFn | null = null;
	updateItalicState: UpdateItalicStateFn | null = null;
	updateLetterSpacingState: UpdateLetterSpacingStateFn | null = null;
	updateLineHeightState: UpdateLineHeightStateFn | null = null;
	updateStrikethroughState: UpdateStrikethroughStateFn | null = null;
	updateTextAlignState: UpdateTextAlignStateFn | null = null;
	updateUnderlineState: UpdateUnderlineStateFn | null = null;

	updateState({
		backgroundColor,
		bold,
		color,
		fontFamily,
		fontSize,
		indentation,
		italic,
		letterSpacing,
		lineHeight,
		strikethrough,
		textAlign,
		underline,
	}: UpdateFormatStylesButtonsStateProps) {
		if (backgroundColor) {
			this.#backgroundColor = backgroundColor;
			this.updateBackgroundColorState?.(backgroundColor);
		}

		if (bold) {
			this.#bold = bold;
			this.updateBoldState?.(bold);
		}

		if (color) {
			this.#color = color;
			this.updateColorState?.(color);
		}

		if (fontFamily) {
			this.#fontFamily = fontFamily;
			this.updateFontFamilyState?.(fontFamily);
		}

		if (fontSize) {
			this.#fontSize = fontSize;
			this.updateFontSizeState?.(fontSize);
		}

		if (indentation) {
			this.#indentation = indentation;
			this.updateIndentationState?.(indentation);
		}

		if (italic) {
			this.#italic = italic;
			this.updateItalicState?.(italic);
		}

		if (letterSpacing) {
			this.#letterSpacing = letterSpacing;
			this.updateLetterSpacingState?.(letterSpacing);
		}

		if (lineHeight) {
			this.#lineHeight = lineHeight;
			this.updateLineHeightState?.(lineHeight);
		}

		if (strikethrough) {
			this.#strikethrough = strikethrough;
			this.updateStrikethroughState?.(strikethrough);
		}

		if (textAlign) {
			this.#textAlign = textAlign;
			this.updateTextAlignState?.(textAlign);
		}

		if (underline) {
			this.#underline = underline;
			this.updateUnderlineState?.(underline);
		}
	}
}
