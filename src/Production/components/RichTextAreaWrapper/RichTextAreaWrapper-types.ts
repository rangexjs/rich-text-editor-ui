import type { interactiveOverlayName } from "@constants";
import type {
	AnchorOverlayStore,
	CaretListboxOverlayStore,
	TableSettingsOverlayStore,
} from "@externalStores";

type InteractiveOverlayName = typeof interactiveOverlayName;

type ShouldAttachInteractiveOverlay = {
	[Key in keyof InteractiveOverlayName]+?: boolean;
};

export interface RichTextAreaWrapperProps {
	interactiveOverlays: ShouldAttachInteractiveOverlay;
	anchorOverlayStore: AnchorOverlayStore;
	caretListboxOverlayStore: CaretListboxOverlayStore;
	tableSettingsOverlayStore: TableSettingsOverlayStore;
	richTextArea: HTMLElement;
}
