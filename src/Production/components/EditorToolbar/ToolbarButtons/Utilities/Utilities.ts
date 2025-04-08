import type { SetsAreEqualProps, SetsAreaEqualReturn } from "./Utilities-types";

export const toolbarButtonClassName = "p-1.5 rounded-sm";

export const setsAreEqual = ({
	setA,
	setB,
}: SetsAreEqualProps): SetsAreaEqualReturn => {
	if (setA.size !== setB.size) {
		return false;
	}

	for (const aValue of setA) {
		if (setB.has(aValue)) {
			continue;
		}

		return false;
	}

	return true;
};
