import type { ReactNode, RefObject } from "react";

export interface ToolbarDropdownProps {
	ref: RefObject<HTMLDivElement>;
	className?: string;
	children: ReactNode;
	position?: "left" | "center" | "right";
}
