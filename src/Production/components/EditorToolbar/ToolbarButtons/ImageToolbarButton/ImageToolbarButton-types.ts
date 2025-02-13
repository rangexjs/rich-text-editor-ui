import type { ReactNode } from "react";

import type { NodeInsertionButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

interface PopoverButton {
	children: ReactNode;
	onClick: () => void;
}

export type PopoverButtons = PopoverButton[];

export interface ImageToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<NodeInsertionButtonsState, "image">;
}
