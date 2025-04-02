import type { AnchorOverlayStore, AnchorProps } from "@externalStores";

interface SetAnchorPropsProps extends Partial<AnchorProps> {}

export type SetAnchorPropsFn = (props: SetAnchorPropsProps) => void;

export interface OnAnchorApplyFnProps extends AnchorProps {}

export type OnAnchorApplyFn = (props: OnAnchorApplyFnProps) => void;

export type OnAnchorCancelFn = () => void;

export interface AnchorPopoverProps {
	anchorOverlayStore: AnchorOverlayStore;
}
