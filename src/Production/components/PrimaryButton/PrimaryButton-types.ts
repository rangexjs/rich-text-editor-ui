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

export type PrimaryButtonOnClickFn = (props: OnClickFnProps) => void;

export interface PrimaryButtonProps {
	children: ReactNode;
	checked?: boolean;
	disabled?: boolean;
	isChevron?: boolean;
	anchorName?: string;
	popoverTargetElementRef?: RefObject<HTMLElement | null>;
	className?: string;
	onClick?: PrimaryButtonOnClickFn;
}
