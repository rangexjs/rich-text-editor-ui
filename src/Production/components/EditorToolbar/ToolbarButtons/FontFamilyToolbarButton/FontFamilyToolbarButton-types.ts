import type { FormatStylesButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

import type { fontFamilyList } from "./FontFamilyToolbarButton";

export type FontFamilyList = typeof fontFamilyList;

export type FontFamilyValue = (typeof fontFamilyList)[number];

export type OnFontFamilyClickProps = "default" | FontFamilyValue;

export interface FontFamilyToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<FormatStylesButtonsState, "fontFamily">;
}
