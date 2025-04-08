import type {
	NodeInsertionButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type AnchorIsChecked = boolean;

export type AnchorIsDisabled = boolean;

export interface AnchorToolbarButtonState {
	isChecked: AnchorIsChecked;
	isDisabled: AnchorIsDisabled;
}

export interface AnchorToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		NodeInsertionButtonsStateManagerObj {}
