import type { ReactNode, RefObject } from "react";

export interface ToolbarDropdownProps {
	ref: RefObject<HTMLDivElement>;
	positionAnchor: string;
	className?: string;
	children: ReactNode;
}
