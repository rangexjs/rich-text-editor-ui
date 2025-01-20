export interface EditAnchorProps {
	url: string;
	isOpenNewTab: boolean;
	isDownloadable: boolean;
}

export type OnActionProps =
	| ({ type: "apply" } & EditAnchorProps)
	| { type: "cancel" }
	| { type: "unlink" };

export type OnActionFn = (props: OnActionProps) => void;

export interface EditAnchorOverlayState extends EditAnchorProps {
	layout: "default" | "edit";
	onAction: OnActionFn;
}
