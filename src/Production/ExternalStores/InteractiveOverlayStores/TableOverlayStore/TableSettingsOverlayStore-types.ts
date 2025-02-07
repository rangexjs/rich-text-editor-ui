import type {
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

export interface TableSettingsOverlayState {
	layoutView: TableLayoutViewOptionsValue;
	tableProps: TableProps;
	onTablePropertiesAction: OnTablePropertiesActionFn;
}
