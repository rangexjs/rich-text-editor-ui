import type { FloatingControlsCopy, FloatingControlsDrag } from "@components";

import type {
	UpdateCopyStateFn,
	UpdateDragStateFn,
	UpdateFloatingControlsOverlayStateProps,
} from "./FloatingControlsOverlayManager-types";

export class FloatingControlsOverlayManager {
	#copy: FloatingControlsCopy = false;
	#drag: FloatingControlsDrag = false;

	get drag() {
		return this.#drag;
	}

	get copy() {
		return this.#copy;
	}

	updateCopyState: UpdateCopyStateFn | null = null;
	updateDragState: UpdateDragStateFn | null = null;

	updateState({ drag, copy }: UpdateFloatingControlsOverlayStateProps) {
		if (copy !== undefined) {
			this.#copy = copy;
			this.updateCopyState?.(copy);
		}

		if (drag !== undefined) {
			this.#drag = drag;
			this.updateDragState?.(drag);
		}
	}
}
