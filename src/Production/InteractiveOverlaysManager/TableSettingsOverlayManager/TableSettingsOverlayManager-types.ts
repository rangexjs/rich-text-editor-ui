import type {
	CellProps,
	CellSpanModifier,
	ColumnButtons,
	OnCellPropertiesActionFn,
	OnTablePropertiesActionFn,
	RowButtons,
	TableActiveViewValue,
	TableCellActionType,
	TableLayoutViewOptionsValue,
	TableProps,
} from "@components";

// LayoutView
export type UpdateTableSettingsLayoutViewStateProps =
	TableLayoutViewOptionsValue;

export type UpdateTableSettingsLayoutViewStateFn = (
	props: UpdateTableSettingsLayoutViewStateProps,
) => void;

// TableProps
export interface UpdateTablePropsStateProps extends TableProps {}

export type UpdateTablePropsStateFn = (
	props: UpdateTablePropsStateProps,
) => void;

// CellProps
export interface UpdateCellPropsStateProps extends CellProps {}

export type UpdateCellPropsStateFn = (props: UpdateCellPropsStateProps) => void;

// ColumnButtons
export interface UpdateColumnButtonsStateProps extends ColumnButtons {}

export type UpdateColumnButtonsStateFn = (
	props: UpdateColumnButtonsStateProps,
) => void;

// RowButtons
export interface UpdateRowButtonsStateProps extends RowButtons {}

export type UpdateRowButtonsStateFn = (
	props: UpdateRowButtonsStateProps,
) => void;

// CellSpanModifier
export interface UpdateCellSpanModifierStateProps extends CellSpanModifier {}

export type UpdateCellSpanModifierStateFn = (
	props: UpdateCellSpanModifierStateProps,
) => void;

export interface OnTableActiveViewChangeProps {
	activeView: TableActiveViewValue;
}

export type OnTableActiveViewChangeFn = (
	props: OnTableActiveViewChangeProps,
) => void;

interface OnTableCellActionProps {
	type: TableCellActionType;
}

export type OnTableCellActionFn = (props: OnTableCellActionProps) => void;

export type OnTableRemove = () => void;

export interface TableSettingsOverlayState {
	layoutView: TableLayoutViewOptionsValue;
	tableProps: TableProps;
	cellProps: CellProps;
	columnButtons: ColumnButtons;
	rowButtons: RowButtons;
	cellSpanModifier: CellSpanModifier;
	onActiveViewChange: OnTableActiveViewChangeFn;
	onTablePropertiesAction: OnTablePropertiesActionFn;
	onCellPropertiesAction: OnCellPropertiesActionFn;
	onTableCellAction: OnTableCellActionFn;
	onTableRemove: OnTableRemove;
}

export interface UpdateTableSettingsOverlayStateProps
	extends Partial<TableSettingsOverlayState> {}
