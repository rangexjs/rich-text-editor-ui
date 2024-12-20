import type { FormatStylesButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export type OnIndentationClickProps = "remove" | number;

export interface IndentationToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<FormatStylesButtonsState, "indentation">;
}
