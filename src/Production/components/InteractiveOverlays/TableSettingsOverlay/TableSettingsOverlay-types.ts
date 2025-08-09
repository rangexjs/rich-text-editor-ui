import type { ReactNode, RefObject } from "react";

import type { TableSettingsOverlayManager } from "@interactiveOverlaysManager";

import type { PrimaryButtonProps } from "../../PrimaryButton";

import type {
	tableActiveView,
	tableLayoutViewOptions,
} from "./TableSettingsOverlay";

export type TableLayoutViewOptions = typeof tableLayoutViewOptions;

export type TableLayoutViewOptionsValue =
	TableLayoutViewOptions[keyof TableLayoutViewOptions];

export type TableActiveView = typeof tableActiveView;

export type TableActiveViewValue = TableActiveView[keyof TableActiveView];

export type DropdownIconState = "col" | "row" | "cell-modifier" | null;

interface CellButtonProps {
	disabled: boolean;
	disabledReason?: string;
}

export interface ColumnButtons {
	insertColumnLeft: CellButtonProps;
	insertColumnRight: CellButtonProps;
	deleteColumn: CellButtonProps;
}

export interface RowButtons {
	moveRowsToHead: CellButtonProps;
	moveRowsToBody: CellButtonProps;
	moveRowsToFoot: CellButtonProps;
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
	splitCellFully: CellButtonProps;
}

type CellColActionType = "insert-col-left" | "insert-col-right" | "delete-col";

type CellRowActionType =
	| "move-row-head"
	| "move-row-body"
	| "move-row-foot"
	| "insert-row-above"
	| "insert-row-below"
	| "delete-row";

type CellSpanModifierType =
	| "merge-selected-cells"
	| "merge-cell-up"
	| "merge-cell-down"
	| "merge-cell-left"
	| "merge-cell-right"
	| "split-cell-horizontally"
	| "split-cell-vertically"
	| "split-cell-fully";

export type TableCellActionType =
	| CellColActionType
	| CellRowActionType
	| CellSpanModifierType;

export interface OnTableActionButtonClickProps {
	dropdownRef: RefObject<HTMLDivElement | null>;
	type: TableCellActionType;
}

interface TableIconButton extends PrimaryButtonProps {
	dropdownRef?: RefObject<HTMLDivElement | null>;
	popover?: ReactNode;
}

export type TableButtonsList = TableIconButton[];

export interface TableSettingsOverlayProps {
	tableSettingsOverlayManager: TableSettingsOverlayManager;
}
