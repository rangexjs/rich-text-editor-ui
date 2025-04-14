import type { TableSettingsOverlayManager } from "@interactiveOverlaysManager";

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

export interface TableInputValidity {
	tableWidth: boolean;
	tableHeight: boolean;
	borderWidth: boolean;
}

export type SelectedBorderColor = string | null;

interface UpdateTablePropsProps extends Partial<TableProps> {}

export type UpdateTablePropsFn = (props: UpdateTablePropsProps) => void;

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

export type GetTableBorderWidthForActionReturn =
	| {
			isInvalid: false;
			borderWidth: TableActionBorderWidth;
	  }
	| { isInvalid: true };

export interface TablePropertiesProps {
	shouldDisplay: boolean;
	onClose: () => void;
	tableProps: TableProps;
	updateTableProps: UpdateTablePropsFn;
	tableSettingsOverlayManager: TableSettingsOverlayManager;
}
