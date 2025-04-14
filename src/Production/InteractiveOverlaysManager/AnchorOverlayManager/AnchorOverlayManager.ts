import type {
	AnchorInitialFocusTarget,
	AnchorIsDownloadable,
	AnchorIsOpenNewTab,
	AnchorLayoutView,
	AnchorTextToDisplay,
	AnchorUrl,
} from "@components";

import type {
	OnActionFn,
	OnAnchorActiveViewChangeFn,
	OnAnchorCloseFn,
	UpdateAnchorLayoutViewStateFn,
	UpdateAnchorOverlayStateProps,
	UpdateInitialFocusTargetStateFn,
	UpdateIsDownloadableStateFn,
	UpdateIsOpenNewTabStateFn,
	UpdateTextToDisplayStateFn,
	UpdateUrlStateFn,
} from "./AnchorOverlayManager-types";

export class AnchorOverlayManager {
	#layoutView: AnchorLayoutView = "main";
	#textToDisplay: AnchorTextToDisplay = "Example website";
	#url: AnchorUrl = "https://example.com";
	#initialFocusTarget: AnchorInitialFocusTarget = null;
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

	get initialFocusTarget() {
		return this.#initialFocusTarget;
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
	updateInitialFocusTargetState: UpdateInitialFocusTargetStateFn | null = null;
	updateIsOpenNewTabState: UpdateIsOpenNewTabStateFn | null = null;
	updateIsDownloadableState: UpdateIsDownloadableStateFn | null = null;

	onActiveViewChange: OnAnchorActiveViewChangeFn | null = null;
	onAction: OnActionFn | null = null;
	onClose: OnAnchorCloseFn | null = null;

	updateState({
		layoutView,
		textToDisplay,
		url,
		initialFocusTarget,
		isOpenNewTab,
		isDownloadable,
		onActiveViewChange,
		onAction,
		onClose,
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

		if (initialFocusTarget !== undefined) {
			this.#initialFocusTarget = initialFocusTarget;
			this.updateInitialFocusTargetState?.(initialFocusTarget);
		}

		if (isOpenNewTab !== undefined) {
			this.#isOpenNewTab = isOpenNewTab;
			this.updateIsOpenNewTabState?.(isOpenNewTab);
		}

		if (isDownloadable !== undefined) {
			this.#isDownloadable = isDownloadable;
			this.updateIsDownloadableState?.(isDownloadable);
		}

		if (onActiveViewChange !== undefined) {
			this.onActiveViewChange = onActiveViewChange;
		}

		if (onAction !== undefined) {
			this.onAction = onAction;
		}

		if (onClose !== undefined) {
			this.onClose = onClose;
		}
	}
}
