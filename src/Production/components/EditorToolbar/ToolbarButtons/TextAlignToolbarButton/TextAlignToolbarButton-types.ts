import type { FormattableButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export type TextAlignType = "center" | "justify" | "left" | "right";

export type TextAlignList = TextAlignType[];

export type OnTextAlignClickProps = TextAlignType;

export interface TextAlignToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<FormattableButtonsState, "textAlign">;
}
