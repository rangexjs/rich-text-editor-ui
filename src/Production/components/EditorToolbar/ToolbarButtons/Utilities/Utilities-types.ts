import type { FormatStylesState } from "@toolbarButtonsActionManager";
import type { PickType } from "@utilities";
import type { ToolbarButtonsActionManager } from "src/Production/ToolbarButtonsActionManager";

export type TextDecorationState = NonNullable<
	PickType<FormatStylesState, "textDecoration">
>;

export interface ToolbarButtonsActionManagerObj {
	toolbarButtonsActionManager: ToolbarButtonsActionManager;
}
