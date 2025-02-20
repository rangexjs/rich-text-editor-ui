import type {
	GetValidBorderStyleProps,
	GetValidBorderStyleReturn,
} from "./Utilities-types";

export const getValidBorderStyle = ({
	borderStyle,
	validBorderStyles,
}: GetValidBorderStyleProps): GetValidBorderStyleReturn => {
	const defaultBorderStyle = "none";

	if (!validBorderStyles.includes(defaultBorderStyle)) {
		throw new Error(`ValidBorderStyles must include ${defaultBorderStyle}.`);
	}

	if (borderStyle === undefined) {
		return defaultBorderStyle;
	}

	if (validBorderStyles.includes(borderStyle)) {
		return borderStyle;
	}

	return defaultBorderStyle;
};
