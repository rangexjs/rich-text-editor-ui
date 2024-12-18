import type {
	Dispatch,
	MouseEvent,
	ReactNode,
	RefObject,
	SetStateAction,
} from "react";

interface OnClickFnProps {
	event: MouseEvent;
	isChecked: boolean;
	isDisabled: boolean;
	setIsChecked: Dispatch<SetStateAction<boolean>>;
}

export type ToolbarButtonOnClickFn = (props: OnClickFnProps) => void;

export interface ToolbarButtonProps {
	children: ReactNode;
	isChevron: boolean;
	checked: boolean;
	disabled: boolean;
	anchorName?: string;
	popoverTargetElementRef?: RefObject<HTMLElement>;
	onClick?: ToolbarButtonOnClickFn;
}
