import type {
	FormatStylesButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

import type { fontFamilyList } from "./FontFamilyToolbarButton";

export type FontFamilyIsDisabled = boolean;

export type FontFamilyValues = Set<string>;

export interface FontFamilyToolbarButtonState {
	isDisabled: FontFamilyIsDisabled;
	values: FontFamilyValues;
}

export type FontFamilyList = typeof fontFamilyList;

export type FontFamilyValue = (typeof fontFamilyList)[number];

export type OnFontFamilyClickProps = "default" | FontFamilyValue;

export interface FontFamilyToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		FormatStylesButtonsStateManagerObj {}
