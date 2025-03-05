import type { NodeInsertionButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export type ListStyleType = "disc" | "circle" | "square" | "decimal";

export type ListItemList = ListStyleType[];

export type OnListButtonClickProps = ListStyleType;

export interface ListToolbarButtonProps extends ToolbarButtonsActionManagerObj {
	state: PickType<NodeInsertionButtonsState, "list">;
}
