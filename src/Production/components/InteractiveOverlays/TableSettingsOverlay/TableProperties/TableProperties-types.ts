import type { Dispatch, ReactNode, SetStateAction } from "react";

import type {
	OnTablePropertiesActionFn,
	TableLayoutViewOptionsValue,
	TableProps,
} from "@externalStores";

export type Alignment = "left" | "center" | "right";

export type SelectedBorderColor = string | null;

interface AlignmentButton {
	alignment: Alignment;
	children: ReactNode;
}

export type AlignmentButtons = AlignmentButton[];

interface SetTablePropsProps extends Partial<TableProps> {}

export type SetTablePropsFn = (props: SetTablePropsProps) => void;

export interface TablePropertiesProps {
	layoutView: TableLayoutViewOptionsValue;
	setLayoutView: Dispatch<SetStateAction<TableLayoutViewOptionsValue>>;
	tableProps: TableProps;
	setTableProps: SetTablePropsFn;
	onTablePropertiesAction: OnTablePropertiesActionFn;
}
