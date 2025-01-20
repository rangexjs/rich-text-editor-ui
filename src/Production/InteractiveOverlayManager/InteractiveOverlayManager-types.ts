import type { interactiveOverlayName } from "@constants";
import type { AnchorOverlayState } from "@externalStores";

type InteractiveOverlayName = typeof interactiveOverlayName;

type InteractiveOverlayNameKey =
	InteractiveOverlayName[keyof InteractiveOverlayName];

type OverlayElement = HTMLDivElement;

export type ExistingOverlays = Map<InteractiveOverlayNameKey, OverlayElement>;

export type GetOverlayElementProps = InteractiveOverlayNameKey;

export type GetOverlayElementReturn = OverlayElement | undefined;

export type CreateRootElementReturn = OverlayElement;

export type GetAnchorElementReturn = HTMLDivElement;

export interface UpdateAnchorStateProps extends Partial<AnchorOverlayState> {}

export interface InteractiveOverlayReturn {
	getOverlayElement: (props: GetOverlayElementProps) => GetOverlayElementReturn;
	createAnchorElement: () => GetAnchorElementReturn;
	updateAnchorState: (props: UpdateAnchorStateProps) => void;
}
