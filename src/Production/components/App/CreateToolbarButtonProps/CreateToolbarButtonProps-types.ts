import type { buttonsName } from "@constants";
import type {
	FormattableButtonsState,
	InsertionButtonsState,
	NavigationButtonsState,
} from "@externalStores";
import type { ToolbarButtonsStateManager } from "@toolbarButtonsStateManager";

import type { ToolbarButtonProps } from "../../ToolbarButton";

interface ToolbarButtonsStateManagerObj {
	toolbarButtonsStateManager: ToolbarButtonsStateManager;
}

type PickType<T, K extends keyof T> = Pick<T, K>[K];

interface GetFormattableState<Key extends keyof FormattableButtonsState> {
	state: PickType<FormattableButtonsState, Key>;
}

interface GetInsertionState<Key extends keyof InsertionButtonsState> {
	state: PickType<InsertionButtonsState, Key>;
}

interface GetNavigationState<Key extends keyof NavigationButtonsState> {
	state: PickType<NavigationButtonsState, Key>;
}

export interface CreateAnchorPropsProps
	extends ToolbarButtonsStateManagerObj,
		GetInsertionState<"anchor"> {}

export interface CreateBackgroundColorPropsProps
	extends ToolbarButtonsStateManagerObj,
		GetFormattableState<"backgroundColor"> {}

export interface CreateBoldPropsProps
	extends ToolbarButtonsStateManagerObj,
		GetFormattableState<"bold"> {}

export interface CreateBlockQuotePropsProps
	extends ToolbarButtonsStateManagerObj,
		GetInsertionState<"blockQuote"> {}

export interface CreateCodeBlockPropsProps
	extends ToolbarButtonsStateManagerObj,
		GetInsertionState<"codeBlock"> {}

export interface CreateColorPropsProps
	extends ToolbarButtonsStateManagerObj,
		GetFormattableState<"color"> {}

export interface CreateHistoryBackPropsProps
	extends ToolbarButtonsStateManagerObj,
		GetNavigationState<"historyBack"> {}

export interface CreateHistoryForwardPropsProps
	extends ToolbarButtonsStateManagerObj,
		GetNavigationState<"historyForward"> {}

export interface CreateItalicPropsProps
	extends ToolbarButtonsStateManagerObj,
		GetFormattableState<"italic"> {}

type ButtonName = (typeof buttonsName)[keyof typeof buttonsName];

export interface CreateToolbarButtonPropsProps
	extends ToolbarButtonsStateManagerObj {
	buttonName: ButtonName;
	formattableButtons: FormattableButtonsState;
	insertionButtons: InsertionButtonsState;
	navigationButtons: NavigationButtonsState;
}

export interface CreateToolbarButtonPropsReturn extends ToolbarButtonProps {}
