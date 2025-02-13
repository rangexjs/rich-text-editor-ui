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

export interface AnchorOverlayState extends AnchorProps {
	layout: "default" | "edit";
	onAction: OnActionFn;
}
