import type { FormattableButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export interface BoldToolbarButtonProps extends ToolbarButtonsActionManagerObj {
	state: PickType<FormattableButtonsState, "bold">;
}
