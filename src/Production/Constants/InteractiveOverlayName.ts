export const interactiveOverlayName = {
	anchor: "anchor",
	tableSettings: "tableSettings",
	floatingControls: "floatingControls",
	caretListbox: "caretListbox",
} as const;

const createId = (name: string) => `overlay-id-${name}` as const;

export const interactiveOverlayId = {
	anchor: createId(interactiveOverlayName.anchor),
	tableSettings: createId(interactiveOverlayName.tableSettings),
	floatingControls: createId(interactiveOverlayName.floatingControls),
	caretListbox: createId(interactiveOverlayName.caretListbox),
} as const;
