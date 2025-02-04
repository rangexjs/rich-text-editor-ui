import { ButtonsStore } from "../../ButtonsStore";

import type { TableSettingsOverlayState } from "./TableSettingsOverlayStore-types";

export const tableLayoutViewOptions = {
	tableIcons: "table-icons",
	tableProperties: "table-properties",
	tableCellProperties: "table-cell-properties",
} as const;

export const tableBorderStyles = [
	"solid",
	"dotted",
	"dashed",
	"double",
	"groove",
	"ridge",
	"inset",
	"outset",
	"none",
	"hidden",
] as const;

const initialState: TableSettingsOverlayState = Object.seal({
	layoutView: tableLayoutViewOptions.tableProperties,
	tableProps: {
		width: "0px",
		height: "0px",
		alignment: "left",
		borderStyle: "solid",
		borderColor: "#000000ff",
		borderWidth: "0px",
	},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onTablePropertiesAction: () => {},
});

export class TableSettingsOverlayStore extends ButtonsStore<TableSettingsOverlayState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
