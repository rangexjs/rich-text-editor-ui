import type { HistoryNavigationButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export interface HistoryForwardToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<HistoryNavigationButtonsState, "historyForward">;
}
