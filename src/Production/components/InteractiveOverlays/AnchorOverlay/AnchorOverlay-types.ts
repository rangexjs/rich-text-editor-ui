import type { AnchorOverlayStore, AnchorProps } from "@externalStores";

export interface OnAnchorApplyFnProps extends AnchorProps {}

export type OnAnchorApplyFn = (props: OnAnchorApplyFnProps) => void;

export type OnAnchorCancelFn = () => void;

export interface AnchorPopoverProps {
	anchorOverlayStore: AnchorOverlayStore;
}
