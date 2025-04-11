import type {
	NodeInsertionButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type SymbolsIsDisabled = boolean;

export interface SymbolsToolbarButtonState {
	isDisabled: SymbolsIsDisabled;
}

export interface SymbolsToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		NodeInsertionButtonsStateManagerObj {}
