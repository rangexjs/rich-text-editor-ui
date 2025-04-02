import type { interactiveOverlayName } from "@constants";
import type {
	AnchorOverlayStore,
	TableSettingsOverlayStore,
} from "@externalStores";

type InteractiveOverlayName = typeof interactiveOverlayName;

type ShouldAttachInteractiveOverlay = {
	[Key in keyof InteractiveOverlayName]+?: boolean;
};

export interface RichTextAreaWrapperProps {
	interactiveOverlays: ShouldAttachInteractiveOverlay;
	anchorOverlayStore: AnchorOverlayStore;
	tableSettingsOverlayStore: TableSettingsOverlayStore;
	richTextArea: HTMLElement;
}
