import type { interactiveOverlayName } from "@constants";
import type { EditAnchorOverlayState } from "@externalStores";

type InteractiveOverlayName = typeof interactiveOverlayName;

type InteractiveOverlayNameKey =
	InteractiveOverlayName[keyof InteractiveOverlayName];

type OverlayElement = HTMLDivElement;

export type ExistingOverlays = Map<InteractiveOverlayNameKey, OverlayElement>;

export type GetOverlayElementProps = InteractiveOverlayNameKey;

export type GetOverlayElementReturn = OverlayElement | undefined;

export type CreateRootElementReturn = OverlayElement;

export type GetEditAnchorElementReturn = HTMLDivElement;

export interface UpdateEditAnchorStateProps
	extends Partial<EditAnchorOverlayState> {}

export interface InteractiveOverlayReturn {
	getOverlayElement: (props: GetOverlayElementProps) => GetOverlayElementReturn;
	createEditAnchorElement: () => GetEditAnchorElementReturn;
	updateEditAnchorState: (props: UpdateEditAnchorStateProps) => void;
}
