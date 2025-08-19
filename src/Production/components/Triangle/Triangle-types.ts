import type { CSSProperties, RefObject } from "react";

export interface TriangleProps {
	width: number;
	height: number;
	ref?: RefObject<HTMLSpanElement | null>;
	className?: string;
	style?: CSSProperties;
}
