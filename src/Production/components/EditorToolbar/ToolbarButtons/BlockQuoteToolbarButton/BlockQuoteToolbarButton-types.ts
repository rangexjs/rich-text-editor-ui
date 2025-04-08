import type {
	NodeInsertionButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type BlockQuoteIsDisabled = boolean;

export interface BlockQuoteToolbarButtonState {
	isDisabled: BlockQuoteIsDisabled;
}

export interface BlockQuoteToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		NodeInsertionButtonsStateManagerObj {}
