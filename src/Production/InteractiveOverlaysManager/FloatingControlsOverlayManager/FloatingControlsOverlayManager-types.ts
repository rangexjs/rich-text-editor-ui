import type { FloatingControlsCopy, FloatingControlsDrag } from "@components";

// Copy
export type UpdateCopyStateProps = FloatingControlsCopy;

export type UpdateCopyStateFn = (props: UpdateCopyStateProps) => void;

// Drag
export type UpdateDragStateProps = FloatingControlsDrag;

export type UpdateDragStateFn = (props: UpdateDragStateProps) => void;

export interface FloatingControlsOverlayState {
	copy: FloatingControlsCopy;
	drag: FloatingControlsDrag;
}

export interface UpdateFloatingControlsOverlayStateProps
	extends Partial<FloatingControlsOverlayState> {}
