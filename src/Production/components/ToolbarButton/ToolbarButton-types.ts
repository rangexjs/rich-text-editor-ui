import type { MouseEvent, ReactNode } from "react";

export interface ToolbarButtonProps {
	children: ReactNode;
	anchorName?: string;
	isChevron: boolean;
	isChecked: boolean;
	isDisabled: boolean;
	onClick: (event: MouseEvent) => void;
}
