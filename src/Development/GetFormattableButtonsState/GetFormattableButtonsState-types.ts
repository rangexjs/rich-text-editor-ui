import type { FormattableButtonsState } from "@externalStores";
import type { FormatStylesState } from "@toolbarButtonsActionManager";

export interface GetFormattableButtonsStateProps {
	formatStylesState: FormatStylesState;
}

export interface GetFormattableButtonsStateReturn {
	formattableButtonsState: Partial<FormattableButtonsState>;
}
