import type {
	GetOverlayElementProps,
	GetOverlayElementReturn,
} from "./Utilities-types";

export const getOverlayElement = ({
	id,
	shadowRoot,
}: GetOverlayElementProps): GetOverlayElementReturn => {
	const overlayElement = shadowRoot.getElementById(id);

	if (!overlayElement) {
		throw new Error("OverlayElement wasn't found.");
	}

	if (!(overlayElement instanceof HTMLDivElement)) {
		throw new Error("OverlayElement's type is invalid.");
	}

	return overlayElement;
};
