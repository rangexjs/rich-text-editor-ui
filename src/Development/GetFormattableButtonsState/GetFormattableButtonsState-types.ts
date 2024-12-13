import type { FormattableButtonsState } from "@externalStores";
import type { FormatStylesState } from "@toolbarButtonsStateManager";

export interface GetFormattableButtonsStateProps {
	formatStylesState: FormatStylesState;
}

export interface GetFormattableButtonsStateReturn {
	formattableButtonsState: Partial<FormattableButtonsState>;
}
