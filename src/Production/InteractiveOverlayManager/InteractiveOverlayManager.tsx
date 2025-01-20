import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { AnchorOverlay } from "@components";
import { interactiveOverlayName } from "@constants";
import { AnchorOverlayStore } from "@externalStores";

import type {
	CreateRootElementReturn,
	ExistingOverlays,
	GetAnchorElementReturn,
	GetOverlayElementProps,
	GetOverlayElementReturn,
	InteractiveOverlayReturn,
	UpdateAnchorStateProps,
} from "./InteractiveOverlayManager-types";

export class InteractiveOverlayManager {
	#anchorOverlayStore = new AnchorOverlayStore();
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

	#createAnchorElement(): GetAnchorElementReturn {
		const isAnchorExist = this.#existingOverlays.has(
			interactiveOverlayName.anchor,
		);

		if (isAnchorExist) {
			throw new Error("Anchor has already created.");
		}

		const root = this.#createRootElement(
			<AnchorOverlay anchorOverlayStore={this.#anchorOverlayStore} />,
		);

		this.#existingOverlays.set(interactiveOverlayName.anchor, root);

		return root;
	}

	#updateAnchorState(props: UpdateAnchorStateProps) {
		this.#anchorOverlayStore.updateState(props);
	}

	get interactiveOverlay(): InteractiveOverlayReturn {
		return {
			getOverlayElement: (props: GetOverlayElementProps) =>
				this.#getOverlayElement(props),
			// Anchor
			createAnchorElement: () => this.#createAnchorElement(),
			updateAnchorState: (props: UpdateAnchorStateProps) =>
				this.#updateAnchorState(props),
		};
	}
}
