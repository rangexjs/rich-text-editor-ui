import type {
	CellProps,
	OnCellPropertiesActionFn,
	TableLayoutViewOptionsValue,
} from "@externalStores";

export interface SetCellPropsProps extends Partial<CellProps> {}

export type SetCellPropsFn = (props: SetCellPropsProps) => void;

export interface CellPropertiesProps {
	layoutView: TableLayoutViewOptionsValue;
	updateLayoutView: () => void;
	cellProps: CellProps;
	setCellProps: SetCellPropsFn;
	onCellPropertiesAction: OnCellPropertiesActionFn;
}
