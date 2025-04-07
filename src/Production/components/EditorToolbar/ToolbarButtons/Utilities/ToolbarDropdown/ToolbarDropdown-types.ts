import type { ReactNode, RefObject } from "react";

export interface ToolbarDropdownProps {
	ref: RefObject<HTMLDivElement | null>;
	className?: string;
	children: ReactNode;
	position?: "left" | "center" | "right";
}
