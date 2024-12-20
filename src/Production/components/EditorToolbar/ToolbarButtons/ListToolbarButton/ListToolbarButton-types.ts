import type { InsertionButtonsState } from "@externalStores";
import type { ListStateListType } from "@toolbarButtonsActionManager";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export type ListItemList = ListStateListType[];

export type OnListButtonClickProps = ListStateListType;

export interface ListToolbarButtonProps extends ToolbarButtonsActionManagerObj {
	state: PickType<InsertionButtonsState, "list">;
}
