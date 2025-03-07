import { ButtonsStore } from "../../ButtonsStore";

import type { TableSettingsOverlayState } from "./TableSettingsOverlayStore-types";

const tableProperties = "table-properties";

const tableCellProperties = "table-cell-properties";

export const tableLayoutViewOptions = {
	tableIcons: "table-icons",
	tableProperties,
	tableCellProperties,
} as const;

export const tableActiveView = {
	tableProperties,
	tableCellProperties,
	colButtons: "col-buttons",
	rowButtons: "row-buttons",
	cellSpanModifier: "cell-span-modifier",
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
];

export const cellBorderStyles = [
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
];

const initialState: TableSettingsOverlayState = Object.seal({
	layoutView: tableLayoutViewOptions.tableIcons,
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onActiveViewChange: () => {},
	tableProps: {
		width: "0px",
		height: "0px",
		alignment: "left",
		borderStyle: "solid",
		borderColor: "#00000000",
		borderWidth: "0px",
	},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onTablePropertiesAction: () => {},
	cellProps: {
		borderStyle: "solid",
		borderColor: "#00000000",
		borderWidth: "0px",
		backgroundColor: "#00000000",
		alignContent: "start",
	},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onCellPropertiesAction: () => {},
	columnButtons: {
		insertColumnLeft: { disabled: false },
		insertColumnRight: { disabled: false },
		deleteColumn: { disabled: false },
	},
	rowButtons: {
		insertRowAbove: { disabled: false },
		insertRowBelow: { disabled: false },
		deleteRow: { disabled: false },
	},
	cellSpanModifier: {
		mergeSelectedCells: { disabled: false },
		mergeCellUp: { disabled: false },
		mergeCellDown: { disabled: false },
		mergeCellRight: { disabled: false },
		mergeCellLeft: { disabled: false },
		splitCellHorizontally: { disabled: false },
		splitCellVertically: { disabled: false },
	},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onTableCellAction: () => {},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onTableRemove: () => {},
});

export class TableSettingsOverlayStore extends ButtonsStore<TableSettingsOverlayState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
