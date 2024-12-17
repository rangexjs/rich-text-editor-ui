import type { NavigationButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export interface HistoryForwardToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<NavigationButtonsState, "historyForward">;
}
