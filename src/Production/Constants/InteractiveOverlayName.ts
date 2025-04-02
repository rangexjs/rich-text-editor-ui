export const interactiveOverlayName = {
	anchor: "anchor",
	tableSettings: "tableSettings",
} as const;

const createId = (name: string) => `overlay-id-${name}`;

export const interactiveOverlayId = {
	anchor: createId(interactiveOverlayName.anchor),
	tableSettings: createId(interactiveOverlayName.tableSettings),
};
