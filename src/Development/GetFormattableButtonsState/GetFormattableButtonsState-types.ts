import type { FormatStylesActionState } from "@toolbarButtonsActionManager";
import type { FormatStylesButtonsState } from "@toolbarButtonsStateManager";

export interface GetFormattableButtonsStateProps {
	formatStylesState: FormatStylesActionState;
}

export interface GetFormattableButtonsStateReturn {
	formattableButtonsState: Partial<FormatStylesButtonsState>;
}
