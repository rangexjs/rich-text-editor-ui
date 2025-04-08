import type {
	NodeInsertionButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type TodoListIsDisabled = boolean;

export interface TodoListToolbarButtonState {
	isDisabled: TodoListIsDisabled;
}

export interface TodoListToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		NodeInsertionButtonsStateManagerObj {}
