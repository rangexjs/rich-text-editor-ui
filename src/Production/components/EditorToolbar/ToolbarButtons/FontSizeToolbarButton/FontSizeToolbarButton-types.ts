import type { FormatStylesButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export type OnFontSizeClickProps = "default" | number;

export interface FontSizeToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<FormatStylesButtonsState, "fontSize">;
}
