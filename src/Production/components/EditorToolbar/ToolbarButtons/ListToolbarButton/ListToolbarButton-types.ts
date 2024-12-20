import type { NodeInsertionButtonsState } from "@externalStores";
import type { ListActionStateListType } from "@toolbarButtonsActionManager";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export type ListItemList = ListActionStateListType[];

export type OnListButtonClickProps = ListActionStateListType;

export interface ListToolbarButtonProps extends ToolbarButtonsActionManagerObj {
	state: PickType<NodeInsertionButtonsState, "list">;
}
