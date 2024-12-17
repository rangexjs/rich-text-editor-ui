import type { Dispatch, MouseEvent, ReactNode, SetStateAction } from "react";

interface OnClickFnProps {
	event: MouseEvent;
	isChecked: boolean;
	isDisabled: boolean;
	setIsChecked: Dispatch<SetStateAction<boolean>>;
}

export type ToolbarButtonOnClickFn = (props: OnClickFnProps) => void;

export interface ToolbarButtonProps {
	children: ReactNode;
	anchorName?: string;
	isChevron: boolean;
	checked: boolean;
	disabled: boolean;
	onClick: ToolbarButtonOnClickFn;
}
