import type { MouseEvent, ReactNode } from "react";

interface OnClickFnProps {
	event: MouseEvent;
	isChecked: boolean;
	isDisabled: boolean;
}

export type ToolbarButtonOnClickFn = (props: OnClickFnProps) => void;

export interface ToolbarButtonProps {
	children: ReactNode;
	anchorName?: string;
	isChevron: boolean;
	isChecked: boolean;
	isDisabled: boolean;
	onClick: ToolbarButtonOnClickFn;
}
