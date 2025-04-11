import type {
	NodeInsertionButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type TableIsDisabled = boolean;

export interface TableToolbarButtonState {
	isDisabled: TableIsDisabled;
}

interface SquareState {
	index: number;
	isActive: boolean;
}

export type SquareStateList = SquareState[];

export interface OnSquareButtonClickProps {
	index: number;
}

export interface TableToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		NodeInsertionButtonsStateManagerObj {}
