import type { InsertionButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

interface SquareState {
	index: number;
	isActive: boolean;
}

export type SquareStateList = SquareState[];

export interface OnSquareButtonClickProps {
	index: number;
}

export interface TableToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<InsertionButtonsState, "table">;
}
