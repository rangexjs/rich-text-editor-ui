import type { FormatStylesButtonsState } from "@externalStores";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export interface UnderlineToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	states: Pick<FormatStylesButtonsState, "strikethrough" | "underline">;
}
