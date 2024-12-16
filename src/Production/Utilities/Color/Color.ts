import type {
	ColorHSLProps,
	ColorHexProps,
	ColorRGBProps,
	HSLToHexProps,
	HSLToHexReturn,
	HSLToRGBProps,
	HSLToRGBReturn,
	HexToHSLProps,
	HexToHSLReturn,
	RGBToHSLProps,
	RGBToHSLReturn,
} from "./Color-types";

/**
 * Converts HSL to RGBA.
 */
const hslToRgb = ({ h, s, l, a = 1 }: HSLToRGBProps): HSLToRGBReturn => {
	s /= 100;
	l /= 100;

	const c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = l - c / 2;

	let r = 0;
	let g = 0;
	let b = 0;

	if (h >= 0 && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (h >= 60 && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (h >= 120 && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (h >= 180 && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (h >= 240 && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (h >= 300 && h < 360) {
		r = c;
		g = 0;
		b = x;
	}

	// Convert to [0, 255] range
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	const fixedA = Number.parseFloat(a.toFixed(2));

	return { r, g, b, a: fixedA };
};

/**
 * Converts HSL to Hex with Alpha.
 */
const hslToHex = ({ h, s, l, a }: HSLToHexProps): HSLToHexReturn => {
	const { r, g, b, a: alpha } = hslToRgb({ h, s, l, a });

	const toHex = (value: number) => value.toString(16).padStart(2, "0");

	const alphaHex = Math.round(alpha * 255)
		.toString(16)
		.padStart(2, "0");

	const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}` as const;

	return { hex };
};

/**
 * Converts RGBA to HSLA.
 */
const rgbToHsl = ({ r, g, b, a = 1 }: RGBToHSLProps): RGBToHSLReturn => {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;

	let h = 0;
	if (delta !== 0) {
		if (max === r) {
			h = ((g - b) / delta) % 6;
		} else if (max === g) {
			h = (b - r) / delta + 2;
		} else {
			h = (r - g) / delta + 4;
		}
		h = Math.round(h * 60);
		if (h < 0) {
			h += 360;
		}
	}

	const l = (max + min) / 2;
	const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	return {
		h: Math.round(h),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
		a: Number.parseFloat(a.toFixed(2)), // Preserve alpha precision
	};
};

/**
 * Converts Hex to HSLA.
 */
const hexToHsl = ({ hex }: HexToHSLProps): HexToHSLReturn => {
	const replacedHex = hex.replace(/^#/, "");

	if (/[^0-9a-f]/.test(replacedHex)) {
		throw new Error("Hex contains invalid character.");
	}

	const fullHex = (() => {
		if (replacedHex.length === 3 || replacedHex.length === 4) {
			const filledHex = replacedHex.replaceAll(/(.)/g, "$1$1");

			if (filledHex.length === 6) {
				return `${filledHex}ff`;
			}

			return filledHex;
		}

		if (replacedHex.length === 6) {
			return `${replacedHex}ff`;
		}

		return replacedHex;
	})();

	if (fullHex.length !== 8) {
		throw new Error("Hex's value is invalid.");
	}

	const r = Number.parseInt(fullHex.substring(0, 2), 16);
	const g = Number.parseInt(fullHex.substring(2, 4), 16);
	const b = Number.parseInt(fullHex.substring(4, 6), 16);
	const a = Number.parseInt(fullHex.substring(6, 8), 16) / 255; // Convert alpha to [0, 1]

	return rgbToHsl({ r, g, b, a });
};

export const Color = {
	hsl(props: ColorHSLProps) {
		return {
			rgb: () => hslToRgb(props),
			hex: () => hslToHex(props),
		};
	},

	rgb(props: ColorRGBProps) {
		return { rgbToHsl: () => rgbToHsl(props) };
	},

	hex(props: ColorHexProps) {
		return { hexToHsl: () => hexToHsl(props) };
	},
};
