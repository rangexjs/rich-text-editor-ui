import type { AnchorOverlayManager } from "@interactiveOverlaysManager";

import type { anchorLayoutViewOptions } from "./AnchorOverlay";

export type AnchorLayoutViewOptions = typeof anchorLayoutViewOptions;

export type AnchorLayoutViewValue =
	AnchorLayoutViewOptions[keyof AnchorLayoutViewOptions];

export type AnchorLayoutView = AnchorLayoutViewValue;

export type AnchorTextToDisplay = string;

export type AnchorUrl = string;

export type AnchorIsOpenNewTab = boolean;

export type AnchorIsDownloadable = boolean;

export interface AnchorOverlayProps {
	anchorOverlayManager: AnchorOverlayManager;
}
