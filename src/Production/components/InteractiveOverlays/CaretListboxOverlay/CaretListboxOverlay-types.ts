import type { RefCallback } from "react";

import type { CaretListboxOverlayManager } from "@interactiveOverlaysManager";

export interface MentionListItem {
	userId: string;
	userName: string;
	userImage: string;
}

export type MentionSearch = string;

export type MentionList = MentionListItem[];

export type ScrollToItemFn = (
	isActive: boolean,
) => RefCallback<HTMLButtonElement>;

export interface CaretListboxOverlayProps {
	caretListboxOverlayManager: CaretListboxOverlayManager;
}
