import type { CSSProperties } from "react";

import type { HSLFormat } from "@utilities";

export interface ThumbPosition {
	xPosition: number;
	yPosition: number;
}

export interface GetPositionFromSaturationLightnessProps {
	saturation: number;
	lightness: number;
}

export interface GetPositionFromSaturationLightnessReturn {
	xPosition: number;
	yPosition: number;
}

export interface GetHueThumbPositionProps {
	hue: number;
}

export interface GetAlphaThumbPositionProps {
	alpha: number;
}

export interface GetHSLColorProps extends HSLFormat {}

export interface ManageColorUpdateProps {
	hsl: HSLFormat;
}

export interface GetHorizontalThumbPositionProps {
	clientX: number;
	panelLeft: number;
	panelRight: number;
	panelWidth: number;
}

export interface GetVerticalThumbPositionProps {
	clientY: number;
	panelTop: number;
	panelBottom: number;
	panelHeight: number;
}

export interface GetThumbPositionInPercentageProps {
	panel: HTMLDivElement;
	clientX: number;
	clientY: number;
}

export interface GetThumbPositionInPercentageReturn {
	xPosition: number;
	yPosition: number;
}

export interface GetSaturationLightnessFromPositionProps {
	xPosition: number;
	yPosition: number;
}

export interface GetSaturationLightnessFromPositionReturn {
	saturation: number;
	lightness: number;
}

export interface GetPositionFromHSLReturn {
	panelThumbXPosition: number;
	panelThumbYPosition: number;
	hueThumbPosition: number;
}

export interface ManageThumbUpdateProps {
	clientX: number;
	clientY: number;
	panel: HTMLDivElement;
}

export interface OnSpectrumColorChangeFnProps {
	hsl: HSLFormat;
}

export type OnSpectrumColorChangeFn = (
	props: OnSpectrumColorChangeFnProps,
) => void;

export interface SpectrumColorProps {
	hsl: HSLFormat;
	panelWidth: number;
	panelHeight: number;
	className?: string;
	style?: CSSProperties;
	onColorChange: OnSpectrumColorChangeFn;
}
