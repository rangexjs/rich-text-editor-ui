import type {
	CellActionBorderWidth,
	CellProps,
	OnCellPropertiesActionFn,
	TableLayoutViewOptionsValue,
} from "@externalStores";

export interface SetCellPropsProps extends Partial<CellProps> {}

export type SetCellPropsFn = (props: SetCellPropsProps) => void;

export type GetBorderWidthForActionReturn =
	| {
			isInvalid: false;
			borderWidth: CellActionBorderWidth;
	  }
	| { isInvalid: true };

export interface CellPropertiesProps {
	layoutView: TableLayoutViewOptionsValue;
	updateLayoutView: () => void;
	cellProps: CellProps;
	setCellProps: SetCellPropsFn;
	onCellPropertiesAction: OnCellPropertiesActionFn;
}
