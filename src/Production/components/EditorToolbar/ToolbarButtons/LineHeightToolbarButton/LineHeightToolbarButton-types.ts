import type { FormattableButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export type OnLineHeightClickProps = "default" | number;

export interface LineHeightToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<FormattableButtonsState, "lineHeight">;
}
