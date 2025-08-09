import type { RefObject } from "react";

export interface ButtonInfoProps {
	disabled: boolean;
	disabledReason: string | undefined;
}

interface TableButton {
	name: string;
	disabled: boolean;
	disabledReason?: string;
	onClick: () => void;
}

export type TableButtons = TableButton[];

export type TableButtonsGroup = TableButtons[];

export interface TableCellDropdownProps {
	popoverTargetElementRef: RefObject<HTMLDivElement | null>;
	buttonsGroup: TableButtonsGroup;
}
