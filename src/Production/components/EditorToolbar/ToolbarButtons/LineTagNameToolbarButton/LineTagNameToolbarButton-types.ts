import type {
	ForamtLineTagNameButtonsState,
	LineTagNameValue,
} from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

interface DropDownButton {
	tagName: LineTagNameValue;
	name: string;
	isActive: boolean;
}

export type DropDownButtonList = DropDownButton[];

export interface LineTagNameToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<ForamtLineTagNameButtonsState, "tagName">;
}
