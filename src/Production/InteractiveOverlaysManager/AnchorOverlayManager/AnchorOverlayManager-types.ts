import type {
	AnchorIsDownloadable,
	AnchorIsOpenNewTab,
	AnchorLayoutView,
	AnchorTextToDisplay,
	AnchorUrl,
} from "@components";

// LayoutView
export type UpdateAnchorLayoutViewStateProps = AnchorLayoutView;

export type UpdateAnchorLayoutViewStateFn = (
	props: UpdateAnchorLayoutViewStateProps,
) => void;

// TextToDisplay
export type UpdateTextToDisplayStateProps = AnchorTextToDisplay;

export type UpdateTextToDisplayStateFn = (
	props: UpdateTextToDisplayStateProps,
) => void;

// Url
export type UpdateUrlStateProps = AnchorUrl;

export type UpdateUrlStateFn = (props: UpdateUrlStateProps) => void;

// IsOpenNewTab
export type UpdateIsOpenNewTabStateProps = AnchorIsOpenNewTab;

export type UpdateIsOpenNewTabStateFn = (
	props: UpdateIsOpenNewTabStateProps,
) => void;

// IsDownloadable
export type UpdateIsDownloadableStateProps = AnchorIsDownloadable;

export type UpdateIsDownloadableStateFn = (
	props: UpdateIsDownloadableStateProps,
) => void;

export interface OnAnchorActiveViewChangeProps {
	activeView: AnchorLayoutView;
}

export type OnAnchorActiveViewChangeFn = (
	props: OnAnchorActiveViewChangeProps,
) => void;

export interface AnchorProps {
	textToDisplay: AnchorTextToDisplay;
	url: AnchorUrl;
	isOpenNewTab: AnchorIsOpenNewTab;
	isDownloadable: AnchorIsDownloadable;
}

export type OnActionProps =
	| ({ type: "apply" } & AnchorProps)
	| { type: "cancel" }
	| { type: "unlink" };

export type OnActionFn = (props: OnActionProps) => void;

export interface AnchorOverlayState {
	layoutView: AnchorLayoutView;
	textToDisplay: AnchorTextToDisplay;
	url: AnchorUrl;
	isOpenNewTab: AnchorIsOpenNewTab;
	isDownloadable: AnchorIsDownloadable;
	onActiveViewChange: OnAnchorActiveViewChangeFn;
	onAction: OnActionFn;
}

export interface UpdateAnchorOverlayStateProps
	extends Partial<AnchorOverlayState> {}
