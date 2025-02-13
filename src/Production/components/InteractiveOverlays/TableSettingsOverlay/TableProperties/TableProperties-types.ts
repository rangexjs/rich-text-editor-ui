import type {
	OnTablePropertiesActionFn,
	TableLayoutViewOptionsValue,
	TableProps,
} from "@externalStores";

export type SelectedBorderColor = string | null;

interface SetTablePropsProps extends Partial<TableProps> {}

export type SetTablePropsFn = (props: SetTablePropsProps) => void;

export interface TablePropertiesProps {
	layoutView: TableLayoutViewOptionsValue;
	updateLayoutView: () => void;
	tableProps: TableProps;
	setTableProps: SetTablePropsFn;
	onTablePropertiesAction: OnTablePropertiesActionFn;
}
