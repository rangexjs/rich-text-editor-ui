import type { tableLayoutViewOptions } from "./TableSettingsOverlayStore";

export type TableLayoutViewOptions = typeof tableLayoutViewOptions;

export type TableLayoutViewOptionsValue =
	TableLayoutViewOptions[keyof TableLayoutViewOptions];

export type TableAlignment = "left" | "center" | "right";

export type TableBorderColor = string;

export interface TableProps {
	width: string | undefined;
	height: string | undefined;
	alignment: TableAlignment;
	borderStyle: string | undefined;
	borderColor: string | undefined;
	borderWidth: string | undefined;
}

export type TableActionWidth = `${number}%` | `${number}px` | undefined;

export type TableActionHeight = `${number}px` | undefined;

export type TableActionBorderStyle = string | null | undefined;

export type TableActionBorderColor = string | null | undefined;

export type TableActionBorderWidth = `${string}px` | null | undefined;

export type OnTablePropertiesActionProps =
	| {
			type: "apply";
			width: TableActionWidth;
			height: TableActionHeight;
			alignment: TableAlignment;
			borderStyle: TableActionBorderStyle;
			borderColor: TableActionBorderColor;
			borderWidth: TableActionBorderWidth;
	  }
	| { type: "cancel" };

export type OnTablePropertiesActionFn = (
	props: OnTablePropertiesActionProps,
) => void;

export type CellAlignContent = "start" | "center" | "end";

export interface CellProps {
	borderStyle: string | undefined;
	borderColor: string | undefined;
	borderWidth: string | undefined;
	backgroundColor: string | undefined;
	alignContent: CellAlignContent;
}

export type CellActionBorderStyle = string | null | undefined;

export type CellActionBorderColor = string | null | undefined;

export type CellActionBorderWidth = `${string}px` | null | undefined;

export type CellActionBackgroundColor = string | null | undefined;

export type CellActionAlignContent = "start" | "center" | "end";

export type OnCellPropertiesActionProps =
	| {
			type: "apply";
			borderStyle: CellActionBorderStyle;
			borderColor: CellActionBorderColor;
			borderWidth: CellActionBorderWidth;
			backgroundColor: CellActionBackgroundColor;
			alignContent: CellActionAlignContent;
	  }
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
