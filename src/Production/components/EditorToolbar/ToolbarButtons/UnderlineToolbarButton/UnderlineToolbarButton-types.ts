import type { FormattableButtonsState } from "@externalStores";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export interface UnderlineToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	states: Pick<FormattableButtonsState, "strikethrough" | "underline">;
}
