import type { FormatStylesButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export interface CreateColorPropsProps extends ToolbarButtonsActionManagerObj {
	state: PickType<FormatStylesButtonsState, "color">;
}
