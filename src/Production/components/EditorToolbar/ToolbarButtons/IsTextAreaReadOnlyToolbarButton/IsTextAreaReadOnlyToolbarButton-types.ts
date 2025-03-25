import type { NonCategorizedOperationButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export interface IsTextAreaReadOnlyToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<NonCategorizedOperationButtonsState, "isTextAreaReadOnly">;
}
