import type {
	cellBorderStyles,
	tableBorderStyles,
	tableLayoutViewOptions,
} from "./TableSettingsOverlayStore";

export type TableLayoutViewOptions = typeof tableLayoutViewOptions;

export type TableLayoutViewOptionsValue =
	TableLayoutViewOptions[keyof TableLayoutViewOptions];

export type TableWidth = string;

export type TableHeight = string;

export type TableAlignment = "left" | "center" | "right";

export type TableBorderStyles = typeof tableBorderStyles;

export type TableBorderStyle = TableBorderStyles[number];

export type TableBorderColor = string;

export type TableBorderWidth = string;

export interface TableProps {
	width: TableWidth;
	height: TableHeight;
	alignment: TableAlignment;
	borderStyle: TableBorderStyle;
	borderColor: TableBorderColor;
	borderWidth: TableBorderWidth;
}

export type OnTablePropertiesActionProps =
	| ({ type: "apply" } & TableProps)
	| { type: "cancel" };

export type OnTablePropertiesActionFn = (
	props: OnTablePropertiesActionProps,
) => void;

export type CellBorderStyles = typeof cellBorderStyles;

export type CellBorderStyle = CellBorderStyles[number];

export type CellBorderColor = string;

export type CellBorderWidth = string;

export type CellAlignment = "top" | "middle" | "bottom";

export interface CellProps {
	borderStyle: TableBorderStyle;
	borderColor: TableBorderColor;
	borderWidth: TableBorderWidth;
	background: string;
	alignment: CellAlignment;
}

export type OnCellPropertiesActionProps =
	| ({ type: "apply" } & CellProps)
	| { type: "cancel" };

export type OnCellPropertiesActionFn = (
	props: OnCellPropertiesActionProps,
) => void;

interface CellButtonProps {
	disabled: boolean;
}

export interface ColumnButtons {
	insertColumnLeft: CellButtonProps;
	insertColumnRight: CellButtonProps;
	deleteColumn: CellButtonProps;
}

export interface RowButtons {
	insertRowAbove: CellButtonProps;
	insertRowBelow: CellButtonProps;
	deleteRow: CellButtonProps;
}

export interface CellSpanModifier {
	mergeSelectedCells: CellButtonProps;
	mergeCellUp: CellButtonProps;
	mergeCellRight: CellButtonProps;
	mergeCellDown: CellButtonProps;
	mergeCellLeft: CellButtonProps;
	splitCellHorizontally: CellButtonProps;
	splitCellVertically: CellButtonProps;
}

type CellColActionType = "insert-col-left" | "insert-col-right" | "delete-col";

type CellRowActionType = "insert-row-above" | "insert-row-below" | "delete-row";

type CellSpanModifierType =
	| "merge-selected-cells"
	| "merge-cell-up"
	| "merge-cell-down"
	| "merge-cell-left"
	| "merge-cell-right"
	| "split-cell-horizontally"
	| "split-cell-vertically";

export type TableCellActionType =
	| CellColActionType
	| CellRowActionType
	| CellSpanModifierType;

interface OnTableCellActionProps {
	type: TableCellActionType;
}

export type OnTableCellActionFn = (props: OnTableCellActionProps) => void;

export interface TableSettingsOverlayState {
	layoutView: TableLayoutViewOptionsValue;
	tableProps: TableProps;
	onTablePropertiesAction: OnTablePropertiesActionFn;
	cellProps: CellProps;
	onCellPropertiesAction: OnCellPropertiesActionFn;
	columnButtons: ColumnButtons;
	rowButtons: RowButtons;
	cellSpanModifier: CellSpanModifier;
	onTableCellAction: OnTableCellActionFn;
	onTableRemove: () => void;
}
