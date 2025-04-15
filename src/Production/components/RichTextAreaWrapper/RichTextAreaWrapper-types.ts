import type { interactiveOverlayName } from "@constants";
import type {
	AnchorOverlayManager,
	CaretListboxOverlayManager,
	FloatingControlsOverlayManager,
	TableSettingsOverlayManager,
} from "@interactiveOverlaysManager";

type InteractiveOverlayName = typeof interactiveOverlayName;

type ShouldAttachInteractiveOverlay = {
	[Key in keyof InteractiveOverlayName]+?: boolean;
};

export interface RichTextAreaWrapperProps {
	interactiveOverlays: ShouldAttachInteractiveOverlay;
	anchorOverlayManager: AnchorOverlayManager;
	caretListboxOverlayManager: CaretListboxOverlayManager;
	floatingControlsOverlayManager: FloatingControlsOverlayManager;
	tableSettingsOverlayManager: TableSettingsOverlayManager;
	richTextArea: HTMLElement;
}
