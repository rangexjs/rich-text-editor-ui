import type { CaretListboxOverlayStore } from "@externalStores";
import type { RefCallback } from "react";

export interface MentionListItem {
	userId: string;
	userName: string;
	userImage: string;
}

export type MentionList = MentionListItem[];

export type ScrollToItemFn = (
	isActive: boolean,
) => RefCallback<HTMLButtonElement>;

export interface CaretListboxOverlayProps {
	caretListboxOverlayStore: CaretListboxOverlayStore;
}
