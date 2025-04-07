export const interactiveOverlayName = {
	anchor: "anchor",
	tableSettings: "tableSettings",
	caretListbox: "caretListbox",
} as const;

const createId = (name: string) => `overlay-id-${name}` as const;

export const interactiveOverlayId = {
	anchor: createId(interactiveOverlayName.anchor),
	tableSettings: createId(interactiveOverlayName.tableSettings),
	caretListbox: createId(interactiveOverlayName.caretListbox),
} as const;
