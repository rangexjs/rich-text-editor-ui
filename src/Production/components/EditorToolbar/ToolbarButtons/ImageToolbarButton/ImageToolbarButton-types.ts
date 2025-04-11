import type { ReactNode } from "react";

import type {
	NodeInsertionButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type ImageIsDisabled = boolean;

export interface ImageToolbarButtonState {
	isDisabled: ImageIsDisabled;
}

interface PopoverButton {
	children: ReactNode;
	onClick: () => void;
}

export type PopoverButtons = PopoverButton[];

export interface ImageToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		NodeInsertionButtonsStateManagerObj {}
