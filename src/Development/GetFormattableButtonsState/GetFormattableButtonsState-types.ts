import type { FormatStylesButtonsState } from "@externalStores";
import type { FormatStylesActionState } from "@toolbarButtonsActionManager";

export interface GetFormattableButtonsStateProps {
	formatStylesState: FormatStylesActionState;
}

export interface GetFormattableButtonsStateReturn {
	formattableButtonsState: Partial<FormatStylesButtonsState>;
}
