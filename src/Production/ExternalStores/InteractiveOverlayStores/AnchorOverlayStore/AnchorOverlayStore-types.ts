import type { anchorLayoutViewOptions } from "./AnchorOverlayStore";

export type AnchorLayoutViewOptions = typeof anchorLayoutViewOptions;

export type AnchorLayoutViewValue =
	AnchorLayoutViewOptions[keyof AnchorLayoutViewOptions];

export type AnchorLayoutView = AnchorLayoutViewValue;

export interface OnAnchorActiveViewChangeProps {
	activeView: AnchorLayoutView;
}

export type OnAnchorActiveViewChangeFn = (
	props: OnAnchorActiveViewChangeProps,
) => void;

export interface AnchorProps {
	url: string;
	isOpenNewTab: boolean;
	isDownloadable: boolean;
}

export type OnActionProps =
	| ({ type: "apply" } & AnchorProps)
	| { type: "cancel" }
	| { type: "unlink" };

export type OnActionFn = (props: OnActionProps) => void;

export interface AnchorOverlayState {
	layoutView: AnchorLayoutView;
	onActiveViewChange: OnAnchorActiveViewChangeFn;
	onAction: OnActionFn;
	anchorProps: AnchorProps;
}
