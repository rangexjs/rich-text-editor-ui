import type { ReactNode } from "react";

export interface GetThumbPositionInPercentageProps {
	sliderTrack: HTMLDivElement;
	clientX: number;
}

export interface ManageThumbUpdateProps {
	clientX: number;
	sliderTrack: HTMLDivElement;
}

interface OnThumbChangeFnProps {
	position: number;
}

export type OnThumbChangeFn = (props: OnThumbChangeFnProps) => void;

export interface RenderChildrenFnProps {
	sliderAnchor: string;
}

export type RenderChildrenFn = (props: RenderChildrenFnProps) => ReactNode;

export interface SliderProps {
	thumbColor: string;
	sliderTrackColor: string;
	position: number;
	className?: string;
	onThumbChange: OnThumbChangeFn;
	renderChildren?: RenderChildrenFn;
}
