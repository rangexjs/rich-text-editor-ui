import type { FormatStylesButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export type TextAlignType = "start" | "center" | "justify" | "end";

export type TextAlignList = TextAlignType[];

export type OnTextAlignClickProps = TextAlignType;

export interface TextAlignToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<FormatStylesButtonsState, "textAlign">;
}
