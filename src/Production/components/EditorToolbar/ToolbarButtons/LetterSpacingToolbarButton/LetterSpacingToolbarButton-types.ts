import type { FormattableButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

export type OnLetterSpacingClickProps = "default" | number;

export interface LetterSpacingToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<FormattableButtonsState, "letterSpacing">;
}
