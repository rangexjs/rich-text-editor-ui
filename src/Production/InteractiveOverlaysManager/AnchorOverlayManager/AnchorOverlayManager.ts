import type {
	AnchorIsDownloadable,
	AnchorIsOpenNewTab,
	AnchorLayoutView,
	AnchorTextToDisplay,
	AnchorUrl,
} from "@components";

import type {
	OnActionFn,
	OnAnchorActiveViewChangeFn,
	UpdateAnchorLayoutViewStateFn,
	UpdateAnchorOverlayStateProps,
	UpdateIsDownloadableStateFn,
	UpdateIsOpenNewTabStateFn,
	UpdateTextToDisplayStateFn,
	UpdateUrlStateFn,
} from "./AnchorOverlayManager-types";

export class AnchorOverlayManager {
	#layoutView: AnchorLayoutView = "main";
	#textToDisplay: AnchorTextToDisplay = "Example website";
	#url: AnchorUrl = "https://example.com";
	#isOpenNewTab: AnchorIsOpenNewTab = true;
	#isDownloadable: AnchorIsDownloadable = false;

	get layoutView() {
		return this.#layoutView;
	}

	get textToDisplay() {
		return this.#textToDisplay;
	}

	get url() {
		return this.#url;
	}

	get isOpenNewTab() {
		return this.#isOpenNewTab;
	}

	get isDownloadable() {
		return this.#isDownloadable;
	}

	updateLayoutViewState: UpdateAnchorLayoutViewStateFn | null = null;
	updateTextToDisplayState: UpdateTextToDisplayStateFn | null = null;
	updateUrlState: UpdateUrlStateFn | null = null;
	updateIsOpenNewTabState: UpdateIsOpenNewTabStateFn | null = null;
	updateIsDownloadableState: UpdateIsDownloadableStateFn | null = null;

	onActiveViewChange: OnAnchorActiveViewChangeFn | null = null;
	onAction: OnActionFn | null = null;

	updateState({
		layoutView,
		textToDisplay,
		url,
		isOpenNewTab,
		isDownloadable,
		onActiveViewChange,
		onAction,
	}: UpdateAnchorOverlayStateProps) {
		if (layoutView) {
			this.#layoutView = layoutView;
			this.updateLayoutViewState?.(layoutView);
		}

		if (textToDisplay !== undefined) {
			this.#textToDisplay = textToDisplay;
			this.updateTextToDisplayState?.(textToDisplay);
		}

		if (url !== undefined) {
			this.#url = url;
			this.updateUrlState?.(url);
		}

		if (isOpenNewTab !== undefined) {
			this.#isOpenNewTab = isOpenNewTab;
			this.updateIsOpenNewTabState?.(isOpenNewTab);
		}

		if (isDownloadable !== undefined) {
			this.#isDownloadable = isDownloadable;
			this.updateIsDownloadableState?.(isDownloadable);
		}

		if (onActiveViewChange) {
			this.onActiveViewChange = onActiveViewChange;
		}

		if (onAction) {
			this.onAction = onAction;
		}
	}
}
