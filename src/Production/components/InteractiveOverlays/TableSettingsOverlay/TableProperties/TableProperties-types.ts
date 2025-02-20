import type {
	OnTablePropertiesActionFn,
	TableActionBorderWidth,
	TableActionHeight,
	TableActionWidth,
	TableLayoutViewOptionsValue,
	TableProps,
} from "@externalStores";

export interface InputValidity {
	tableWidth: boolean;
	tableHeight: boolean;
	borderWidth: boolean;
}

export type SelectedBorderColor = string | null;

interface SetTablePropsProps extends Partial<TableProps> {}

export type SetTablePropsFn = (props: SetTablePropsProps) => void;

export type GetTableWidthForActionReturn =
	| {
			isInvalid: false;
			tableWidth: TableActionWidth;
	  }
	| { isInvalid: true };

export type GetTableHeightForActionReturn =
	| {
			isInvalid: false;
			tableHeight: TableActionHeight;
	  }
	| { isInvalid: true };

export type GetBorderWidthForActionReturn =
	| {
			isInvalid: false;
			borderWidth: TableActionBorderWidth;
	  }
	| { isInvalid: true };

export interface TablePropertiesProps {
	layoutView: TableLayoutViewOptionsValue;
	updateLayoutView: () => void;
	tableProps: TableProps;
	setTableProps: SetTablePropsFn;
	onTablePropertiesAction: OnTablePropertiesActionFn;
}
