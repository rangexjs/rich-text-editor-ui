import type { EditAnchorOverlayStore, EditAnchorProps } from "@externalStores";

export interface OnEditAnchorApplyFnProps extends EditAnchorProps {}

export type OnEditAnchorApplyFn = (props: OnEditAnchorApplyFnProps) => void;

export type OnEditAnchorCancelFn = () => void;

export interface AnchorPopoverProps {
	editAnchorOverlayStore: EditAnchorOverlayStore;
}
