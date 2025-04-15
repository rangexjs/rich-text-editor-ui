import type { ReactNode } from "react";

import type { FloatingControlsOverlayManager } from "@interactiveOverlaysManager";

export type FloatingControlsCopy = boolean;

export type FloatingControlsDrag = boolean;

export interface ControlItem {
	children: ReactNode;
}

export type ControlList = ControlItem[];

export interface FloatingControlsOverlayProps {
	floatingControlsOverlayManager: FloatingControlsOverlayManager;
}
