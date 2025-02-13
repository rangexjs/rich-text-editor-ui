import type { FormatStylesButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export type OnLineHeightClickProps = "default" | number;

export interface LineHeightToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<FormatStylesButtonsState, "lineHeight">;
}
