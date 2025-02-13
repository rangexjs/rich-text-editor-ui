import type { NodeInsertionButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export interface BlockQuoteToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<NodeInsertionButtonsState, "blockQuote">;
}
