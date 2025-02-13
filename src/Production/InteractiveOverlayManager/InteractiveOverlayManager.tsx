import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { AnchorOverlay, TableSettingsOverlay } from "@components";
import { interactiveOverlayName } from "@constants";
import { AnchorOverlayStore, TableSettingsOverlayStore } from "@externalStores";

import type {
	CreateAnchorElementReturn,
	CreateRootElementReturn,
	CreateTableSettingsElementReturn,
	ExistingOverlays,
	GetOverlayElementProps,
	GetOverlayElementReturn,
	InteractiveOverlayReturn,
	UpdateAnchorStateProps,
	UpdateTableSettingsStateProps,
} from "./InteractiveOverlayManager-types";

export class InteractiveOverlayManager {
	#anchorOverlayStore = new AnchorOverlayStore();
	#tableSettingsOverlayStore = new TableSettingsOverlayStore();
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

	#createAnchorElement(): CreateAnchorElementReturn {
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

	#createTableSettingsElement(): CreateTableSettingsElementReturn {
		const isTableSettingsExist = this.#existingOverlays.has(
			interactiveOverlayName.tableSettings,
		);

		if (isTableSettingsExist) {
			throw new Error("TableSettings has already created.");
		}

		const root = this.#createRootElement(
			<TableSettingsOverlay
				tableSettingsOverlayStore={this.#tableSettingsOverlayStore}
			/>,
		);

		this.#existingOverlays.set(interactiveOverlayName.tableSettings, root);

		return root;
	}

	#updateTableSettingsState(props: UpdateTableSettingsStateProps) {
		this.#tableSettingsOverlayStore.updateState(props);
	}

	get interactiveOverlay(): InteractiveOverlayReturn {
		return {
			getOverlayElement: (props: GetOverlayElementProps) =>
				this.#getOverlayElement(props),
			// Anchor
			createAnchorElement: () => this.#createAnchorElement(),
			updateAnchorState: (props: UpdateAnchorStateProps) =>
				this.#updateAnchorState(props),
			// TableSettings
			createTableSettingsElement: () => this.#createTableSettingsElement(),
			updateTableSettingsState: (props: UpdateTableSettingsStateProps) =>
				this.#updateTableSettingsState(props),
		};
	}
}
