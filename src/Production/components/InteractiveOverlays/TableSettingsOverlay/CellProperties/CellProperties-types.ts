export type CellAlignContent = "start" | "center" | "end";

export interface CellProps {
	borderStyle: string | undefined;
	borderColor: string | undefined;
	borderWidth: string | undefined;
	backgroundColor: string | undefined;
	alignContent: CellAlignContent;
}

export type CellActionBorderStyle = string | null | undefined;

export type CellActionBorderColor = string | null | undefined;

export type CellActionBorderWidth = `${string}px` | null | undefined;

export type CellActionBackgroundColor = string | null | undefined;

export type CellActionAlignContent = "start" | "center" | "end";

export type OnCellPropertiesActionProps =
	| {
			type: "apply";
			borderStyle: CellActionBorderStyle;
			borderColor: CellActionBorderColor;
			borderWidth: CellActionBorderWidth;
			backgroundColor: CellActionBackgroundColor;
			alignContent: CellActionAlignContent;
	  }
	| { type: "cancel" };

export type OnCellPropertiesActionFn = (
	props: OnCellPropertiesActionProps,
) => void;

export interface UpdateCellPropsProps extends Partial<CellProps> {}

export type UpdateCellPropsFn = (props: UpdateCellPropsProps) => void;

export type GetCellBorderWidthForActionReturn =
	| {
			isInvalid: false;
			borderWidth: CellActionBorderWidth;
	  }
	| { isInvalid: true };

export interface CellPropertiesProps {
	shouldDisplay: boolean;
	onClose: () => void;
	cellProps: CellProps;
	updateCellProps: UpdateCellPropsFn;
	onCellPropertiesAction: OnCellPropertiesActionFn | null;
}
