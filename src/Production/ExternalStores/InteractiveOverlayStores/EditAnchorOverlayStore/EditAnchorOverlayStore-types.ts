export interface EditAnchorProps {
	url: string;
	isOpenNewTab: boolean;
	isDownloadable: boolean;
}

export type OnActionProps =
	| ({ type: "apply" } & EditAnchorProps)
	| { type: "cancel" };

export type OnActionFn = (props: OnActionProps) => void;

export interface EditAnchorOverlayState extends EditAnchorProps {
	onAction: OnActionFn;
}
