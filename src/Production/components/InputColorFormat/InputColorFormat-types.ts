import type { HSLFormat } from "@utilities";

export type ColorFormat = "HSL" | "RGB" | "Hex";

export interface InputHSLFormat {
	h: string;
	s: string;
	l: string;
}

export interface InputRGBFormat {
	r: string;
	g: string;
	b: string;
}

export type InputHexFormat = string;

export type InputAlphaFormat = string;

export interface SyncInputFormatsProps {
	hsl: HSLFormat;
	skip?: ColorFormat;
}

export interface ManageColorUpdateProps {
	hsl: HSLFormat;
}

export interface OnColorFormatChangeFnProps {
	hsl: HSLFormat;
}

export type OnColorFormatChangeFn = (props: OnColorFormatChangeFnProps) => void;

export interface InputColorFormatProps {
	hsl: HSLFormat;
	onColorChange: OnColorFormatChangeFn;
}
