import type { FormattableButtonsState } from "@externalStores";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export interface RemoveFormatToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	formattableButtonsState: FormattableButtonsState;
}
