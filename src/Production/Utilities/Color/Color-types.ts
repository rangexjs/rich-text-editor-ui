export interface HSLFormat {
	h: number;
	s: number;
	l: number;
	a: number;
}

export interface RGBFormat {
	r: number;
	g: number;
	b: number;
	a: number;
}

export interface HexFormat {
	hex: `#${string}`;
}

export interface HSLToRGBProps extends HSLFormat {}

export interface HSLToRGBReturn extends RGBFormat {}

export interface HSLToHexProps extends HSLFormat {}

export interface HSLToHexReturn extends HexFormat {}

export interface RGBToHSLProps {
	r: number;
	g: number;
	b: number;
	a: number;
}

export interface RGBToHSLReturn extends HSLFormat {}

export interface HexToHSLProps extends HexFormat {}

export interface HexToHSLReturn extends HSLFormat {}

export interface ColorHSLProps extends HSLFormat {}

export interface ColorRGBProps extends RGBFormat {}

export interface ColorHexProps extends HexFormat {}
