import type {
	NodeInsertionButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type ListIsDisabled = boolean;

export interface ListToolbarButtonState {
	isDisabled: ListIsDisabled;
}

export type ListStyleType = "disc" | "circle" | "square" | "decimal";

export type ListItemList = ListStyleType[];

export type OnListButtonClickProps = ListStyleType;

export interface ListToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		NodeInsertionButtonsStateManagerObj {}
