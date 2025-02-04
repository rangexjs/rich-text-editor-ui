import type { Dispatch, ReactNode, SetStateAction } from "react";

import type {
	OnTablePropertiesActionFn,
	TableBorderStyle,
	TableLayoutViewOptionsValue,
	TableProps,
} from "@externalStores";
import type { HSLFormat } from "@utilities";

export type GetValidHSLFromHexProps = string;

export interface GetValidHSLFromHexReturn extends HSLFormat {}

export type Alignment = "left" | "center" | "right";

interface AlignmentButton {
	alignment: Alignment;
	children: ReactNode;
}

export type AlignmentButtons = AlignmentButton[];

interface TableBorderProps {
	borderStyle: TableBorderStyle;
	capitalizedBorderStyle: string;
	onClick: () => void;
}

export type TableBorderPropsList = TableBorderProps[];

export interface TablePropertiesProps {
	layoutView: TableLayoutViewOptionsValue;
	setLayoutView: Dispatch<SetStateAction<TableLayoutViewOptionsValue>>;
	tableProps: TableProps;
	onTablePropertiesAction: OnTablePropertiesActionFn;
}
