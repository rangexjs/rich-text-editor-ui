import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { EditAnchorOverlay } from "@components";
import { interactiveOverlayName } from "@constants";
import { EditAnchorOverlayStore } from "@externalStores";

import type {
	CreateRootElementReturn,
	ExistingOverlays,
	GetEditAnchorElementReturn,
	GetOverlayElementProps,
	GetOverlayElementReturn,
	InteractiveOverlayReturn,
	UpdateEditAnchorStateProps,
} from "./InteractiveOverlayManager-types";

export class InteractiveOverlayManager {
	#editAnchorOverlayStore = new EditAnchorOverlayStore();
	#existingOverlays: ExistingOverlays = new Map();

	#getOverlayElement(key: GetOverlayElementProps): GetOverlayElementReturn {
		return this.#existingOverlays.get(key);
	}

	#createRootElement(reactNode: ReactNode): CreateRootElementReturn {
		const domNode = document.createElement("div");

		const root = createRoot(domNode);

		root.render(reactNode);

		return domNode;
	}

	#createEditAnchorElement(): GetEditAnchorElementReturn {
		const isEditAnchorExist = this.#existingOverlays.has(
			interactiveOverlayName.editAnchor,
		);

		if (isEditAnchorExist) {
			throw new Error("EditAnchor has already created.");
		}

		const root = this.#createRootElement(
			<EditAnchorOverlay
				editAnchorOverlayStore={this.#editAnchorOverlayStore}
			/>,
		);

		this.#existingOverlays.set(interactiveOverlayName.editAnchor, root);

		return root;
	}

	#updateAnchorState(props: UpdateEditAnchorStateProps) {
		this.#editAnchorOverlayStore.updateState(props);
	}

	get interactiveOverlay(): InteractiveOverlayReturn {
		return {
			getOverlayElement: (props: GetOverlayElementProps) =>
				this.#getOverlayElement(props),
			// EditAnchor
			createEditAnchorElement: () => this.#createEditAnchorElement(),
			updateEditAnchorState: (props: UpdateEditAnchorStateProps) =>
				this.#updateAnchorState(props),
		};
	}
}
