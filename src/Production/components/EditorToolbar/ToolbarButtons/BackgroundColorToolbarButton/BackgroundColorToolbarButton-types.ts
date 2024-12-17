import type { FormattableButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export interface CreateBackgroundColorPropsProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<FormattableButtonsState, "backgroundColor">;
}
