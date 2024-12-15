interface HSLProps {
	h: number;
	s: number;
	l: number;
	a: number;
}

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

export interface GetHSLColorProps extends HSLProps {}

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

export interface OnColorChangeFnProps {
	hsl: HSLProps;
}

export type OnColorChangeFn = (props: OnColorChangeFnProps) => void;

export interface SpectrumColorProps {
	hslColorState: HSLProps;
	onColorChange: OnColorChangeFn;
}
