import type { RefObject } from "react";

interface TableButton {
	name: string;
	disabled: boolean;
	onClick: () => void;
}

export type TableButtons = TableButton[];

export type TableButtonsGroup = TableButtons[];

export interface TableCellDropdownProps {
	popoverTargetElementRef: RefObject<HTMLDivElement | null>;
	buttonsGroup: TableButtonsGroup;
}
