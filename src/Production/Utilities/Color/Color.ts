import type {
	ColorHSLProps,
	ColorHexProps,
	ColorRGBProps,
	FromColorProps,
	GetHSLFormatFromColorProps,
	GetHSLFormatFromColorReturn,
	HSLFormat,
	HSLToColorProps,
	HSLToHexProps,
	HSLToHexReturn,
	HSLToRGBProps,
	HSLToRGBReturn,
	HexToHSLProps,
	HexToHSLReturn,
	IsValidHSLProps,
	IsValidHexProps,
	IsValidRGBProps,
	RGBToHSLProps,
	RGBToHSLReturn,
} from "./Color-types";

const isValidHSL = ({ h, s, l, a }: IsValidHSLProps) => {
	return (
		h <= 359 &&
		h >= 0 &&
		s <= 100 &&
		s >= 0 &&
		l <= 100 &&
		l >= 0 &&
		a <= 1 &&
		a >= 0
	);
};

const isValidRGB = ({ r, g, b, a }: IsValidRGBProps) => {
	if (![r, g, b].every((v) => v <= 255 && v >= 0)) {
		return false;
	}

	if (!(a <= 1 && a >= 0)) {
		return false;
	}

	return true;
};

const isValidHex = ({ hex }: IsValidHexProps) => {
	const replacedHex = hex.replace(/^#/, "");

	if (/[^0-9a-f]/.test(replacedHex)) {
		return false;
	}

	const { length } = replacedHex;

	if (![3, 4, 6, 8].some((validLength) => length === validLength)) {
		return false;
	}

	if (!(length === 3 || length === 6 || length === 8)) {
		return false;
	}

	return true;
};

const hslToColor = ({ h, s, l, a }: HSLToColorProps) =>
	`hsl(${h}deg, ${s}%, ${l}%, ${a})` as const;

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
	if (!isValidRGB({ r, g, b, a })) {
		throw new Error("RGB's value is invalid.");
	}

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
	if (!isValidHex({ hex })) {
		throw new Error("Hex's value is invalid.");
	}

	const replacedHex = hex.replace(/^#/, "");

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

const getHSLFormatFromColor = ({
	color,
}: GetHSLFormatFromColorProps): GetHSLFormatFromColorReturn => {
	if (color.startsWith("hsl")) {
		const regex = /([0-1]?(\.\d+)|\d+)/g;

		const matchedColor = color.match(regex);

		if (!matchedColor) {
			throw new Error("HSL's format is invalid.");
		}

		const [hue, saturation, lightness, alpha = "1"] = matchedColor;

		// w3c allows the hue to be 360 but it has to be normalized to 0
		const fixedHue = hue === "360" ? "0" : hue;

		const h = +fixedHue;
		const s = +saturation;
		const l = +lightness;
		const a = +alpha;

		const hslFormat: HSLFormat = { h, s, l, a };

		if (!isValidHSL(hslFormat)) {
			throw new Error("HSL's value is invalid.");
		}

		return hslFormat;
	}

	if (color.startsWith("rgb")) {
		const regex = /([0-1]?(\.\d+)|\d+)/g;

		const matchedColor = color.match(regex);

		if (!matchedColor) {
			throw new Error("RGB's format is invalid.");
		}

		const [red, green, blue, alpha = "1"] = matchedColor;

		const r = +red;
		const g = +green;
		const b = +blue;
		const a = +alpha;

		return rgbToHsl({ r, g, b, a });
	}

	if (color.startsWith("#")) {
		return hexToHsl({ hex: color });
	}

	throw new Error("Color type couldn't be handled.");
};

export const Color = {
	hsl(props: ColorHSLProps) {
		return {
			isValid: () => isValidHSL(props),
			color: () => hslToColor(props),
			rgb: () => hslToRgb(props),
			hex: () => hslToHex(props),
		};
	},

	rgb(props: ColorRGBProps) {
		return {
			isValid: () => isValidRGB(props),
			rgbToHsl: () => rgbToHsl(props),
		};
	},

	hex(props: ColorHexProps) {
		return {
			isValid: () => isValidHex(props),
			hexToHsl: () => hexToHsl(props),
		};
	},

	fromColor(props: FromColorProps) {
		return { hslFormat: () => getHSLFormatFromColor(props) };
	},
};
