import type {
	NonCategorizedOperationButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type IsTextAreaReadOnlyIsChecked = boolean;

export interface IsTextAreaReadOnlyToolbarButtonState {
	isChecked: IsTextAreaReadOnlyIsChecked;
}

export interface IsTextAreaReadOnlyToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		NonCategorizedOperationButtonsStateManagerObj {}
