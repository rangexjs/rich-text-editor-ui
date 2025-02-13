import {
	type ChangeEvent,
	type FocusEvent,
	useCallback,
	useEffect,
	useState,
} from "react";

import { Color, type HSLFormat } from "@utilities";

import { ComboBox, type ComboBoxList } from "../ComboBox";

import type {
	ColorFormat,
	InputAlphaFormat,
	InputColorFormatProps,
	InputHSLFormat,
	InputHexFormat,
	InputRGBFormat,
	ManageColorUpdateProps,
	SyncInputFormatsProps,
} from "./InputColorFormat-types";

export const InputColorFormat = ({
	hsl,
	onColorChange,
}: InputColorFormatProps) => {
	const [scopedHSL, setScopedHSL] = useState<HSLFormat>({
		h: Number.NaN,
		s: Number.NaN,
		l: Number.NaN,
		a: Number.NaN,
	});

	const [colorFormat, setColorFormat] = useState<ColorFormat>("Hex");

	const [inputHSL, setInputHSL] = useState<InputHSLFormat>({
		h: `${hsl.h}`,
		s: `${hsl.s}`,
		l: `${hsl.l}`,
	});

	const rgb = Color.hsl(hsl).rgb();

	const [inputRGB, setInputRGB] = useState<InputRGBFormat>({
		r: `${rgb.r}`,
		g: `${rgb.g}`,
		b: `${rgb.b}`,
	});

	const { hex } = Color.hsl(hsl).hex();

	const [inputHex, setInputHex] = useState<InputHexFormat>(hex.slice(1, 7));

	const [inputAlpha, setInputAlpha] = useState<InputAlphaFormat>(
		`${Math.round(hsl.a * 100)}`,
	);

	const syncInputFormats = useCallback(
		({ hsl, skip }: SyncInputFormatsProps) => {
			if (skip !== "Hex") {
				const { hex } = Color.hsl(hsl).hex();

				const slicedHex = hex.slice(1, 7);

				setInputHex(slicedHex);
			}

			if (skip !== "RGB") {
				const { r, g, b } = Color.hsl(hsl).rgb();

				setInputRGB({ r: `${r}`, g: `${g}`, b: `${b}` });
			}

			if (skip !== "HSL") {
				const { h, s, l } = hsl;

				setInputHSL({ h: `${h}`, s: `${s}`, l: `${l}` });
			}

			const alpha = `${Math.round(hsl.a * 100)}`;

			setInputAlpha(alpha);
		},
		[],
	);

	useEffect(() => {
		syncInputFormats({ hsl: scopedHSL, skip: colorFormat });
	}, [scopedHSL, colorFormat, syncInputFormats]);

	useEffect(() => {
		if (
			hsl.h === scopedHSL.h &&
			hsl.s === scopedHSL.s &&
			hsl.l === scopedHSL.l &&
			hsl.a === scopedHSL.a
		) {
			return;
		}

		setScopedHSL(hsl);

		syncInputFormats({ hsl });
	}, [hsl, scopedHSL, syncInputFormats]);

	const manageColorUpdate = ({ hsl }: ManageColorUpdateProps) => {
		setScopedHSL(hsl);

		onColorChange({ hsl });
	};

	const colorFormats: ColorFormat[] = ["Hex", "RGB", "HSL"];

	const colorFormatList: ComboBoxList = colorFormats.map((name) => {
		const onClick = () => {
			setColorFormat(name);
		};

		return { id: name, children: name, onClick };
	});

	const onHexChange = (event: ChangeEvent) => {
		const { currentTarget } = event;

		if (!(currentTarget instanceof HTMLInputElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		const { value } = currentTarget;

		setInputHex(value);

		const replacedValue = value.replace(/^#/, "");

		const { length } = replacedValue;

		const isInvalidLength = length !== 3 && length !== 6;

		const isContainsInvalidCharacter = /[^0-9a-f]/.test(replacedValue);

		if (isInvalidLength || isContainsInvalidCharacter) {
			return;
		}

		const { h, s, l } = Color.hex({ hex: `#${replacedValue}` }).hexToHsl();

		const { a } = hsl;

		manageColorUpdate({ hsl: { h, s, l, a } });
	};

	const onHexBlur = (event: FocusEvent) => {
		const { currentTarget } = event;

		if (!(currentTarget instanceof HTMLInputElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		const { value } = currentTarget;

		const replacedValue = value.replace(/^#/, "");

		const { length } = replacedValue;

		const isInvalidLength = length !== 3 && length !== 6;

		const isContainsInvalidCharacter = /[^0-9a-f]/.test(replacedValue);

		if (isInvalidLength || isContainsInvalidCharacter) {
			const { hex } = Color.hsl(hsl).hex();

			const slicedHex = hex.slice(1, 7);

			setInputHex(slicedHex);

			return;
		}

		setInputHex(replacedValue);
	};

	const rgbInputName = {
		red: "red",
		green: "green",
		blue: "blue",
	} as const;

	const rgbInputList = [
		{ name: rgbInputName.red, value: inputRGB.r },
		{ name: rgbInputName.green, value: inputRGB.g },
		{ name: rgbInputName.blue, value: inputRGB.b },
	] as const;

	const onRGBChange = (event: ChangeEvent) => {
		const { currentTarget } = event;

		if (!(currentTarget instanceof HTMLInputElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		const { name, value } = currentTarget;

		const updatedRGB = { ...inputRGB };

		if (rgbInputName.red === name) {
			updatedRGB.r = value;
		}

		if (rgbInputName.green === name) {
			updatedRGB.g = value;
		}

		if (rgbInputName.blue === name) {
			updatedRGB.b = value;
		}

		setInputRGB(updatedRGB);

		const getNumRGB = (value: string) => Math.max(0, Math.min(255, +value));

		const numRGB = {
			r: getNumRGB(updatedRGB.r),
			g: getNumRGB(updatedRGB.g),
			b: getNumRGB(updatedRGB.b),
			a: 1,
		};

		const { h, s, l } = Color.rgb(numRGB).rgbToHsl();

		const { a } = hsl;

		manageColorUpdate({ hsl: { h, s, l, a } });
	};

	const onRGBBlur = (event: FocusEvent) => {
		const { currentTarget } = event;

		if (!(currentTarget instanceof HTMLInputElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		const { value } = currentTarget;

		const normalizedValue = value.replace(/^0+(?=\d)/, "");

		const numValue = +value;

		if (numValue <= 255 && numValue >= 0 && value === normalizedValue) {
			return;
		}

		const { r, g, b } = Color.hsl(hsl).rgb();

		setInputRGB({ r: `${r}`, g: `${g}`, b: `${b}` });
	};

	const hslInputName = {
		hue: "hue",
		saturation: "saturation",
		lightness: "lightness",
	} as const;

	const hslInputList = [
		{ name: hslInputName.hue, value: inputHSL.h },
		{ name: hslInputName.saturation, value: inputHSL.s },
		{ name: hslInputName.lightness, value: inputHSL.l },
	] as const;

	const onHSLChange = (event: ChangeEvent) => {
		const { currentTarget } = event;

		if (!(currentTarget instanceof HTMLInputElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		const { name, value } = currentTarget;

		const updatedHSL = { ...inputHSL };

		if (hslInputName.hue === name) {
			updatedHSL.h = value;
		}

		if (hslInputName.saturation === name) {
			updatedHSL.s = value;
		}

		if (hslInputName.lightness === name) {
			updatedHSL.l = value;
		}

		setInputHSL(updatedHSL);

		const h = Math.min(359, Math.max(0, +updatedHSL.h));
		const s = Math.min(100, Math.max(0, +updatedHSL.s));
		const l = Math.min(100, Math.max(0, +updatedHSL.l));

		const { a } = hsl;

		manageColorUpdate({ hsl: { h, s, l, a } });
	};

	const onHSLBlur = (event: FocusEvent) => {
		const { currentTarget } = event;

		if (!(currentTarget instanceof HTMLInputElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		const { name, value } = currentTarget;

		const normalizedValue = value.replace(/^0+(?=\d)/, "");

		const numValue = +value;

		const isNotNormalized = value === normalizedValue;

		const isHueValid =
			hslInputName.hue === name && numValue <= 359 && numValue >= 0;

		const isSaturationLightnessValid =
			(hslInputName.saturation === name || hslInputName.lightness === name) &&
			numValue <= 100 &&
			numValue >= 0;

		if (isNotNormalized && isHueValid && isSaturationLightnessValid) {
			return;
		}

		const { h, s, l } = hsl;

		setInputHSL({ h: `${h}`, s: `${s}`, l: `${l}` });
	};

	const onAlphaChange = (event: ChangeEvent) => {
		const { currentTarget } = event;

		if (!(currentTarget instanceof HTMLInputElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		const { value } = currentTarget;

		setInputAlpha(value);

		const numA = +(+value / 100).toFixed(2);
		const a = Math.min(1, Math.max(0, numA));

		const { h, s, l } = hsl;

		manageColorUpdate({ hsl: { h, s, l, a } });
	};

	const onAlphaBlur = (event: FocusEvent) => {
		const { currentTarget } = event;

		if (!(currentTarget instanceof HTMLInputElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		const { value } = currentTarget;

		const fixedValue = +(+value).toFixed(2);

		const a = `${Math.max(0, Math.min(100, fixedValue))}`;

		setInputAlpha(a);
	};

	return (
		<div className="flex justify-between py-2">
			<ComboBox
				buttonChildren={colorFormat}
				list={colorFormatList}
				className=""
				buttonStyles={{ width: "64px", padding: "4px 8px" }}
			/>
			<span className="inline-flex overflow-clip rounded-md border border-slate-200 bg-white font-semibold text-slate-700 text-sm">
				<span className="inline-flex h-full w-[120px] items-center ">
					<span
						className="h-full"
						style={{ display: colorFormat === "Hex" ? "" : "none" }}
					>
						<input
							className="h-full w-full px-0.5 text-center outline-none"
							type="text"
							value={inputHex}
							onChange={onHexChange}
							onBlur={onHexBlur}
						/>
					</span>
					<span
						className="inline-flex h-full"
						style={{ display: colorFormat === "RGB" ? "" : "none" }}
					>
						{rgbInputList.map(({ name, value }) => (
							<input
								key={name}
								className="h-full w-full border-slate-200 px-0.5 text-center outline-none [&:not(:last-child)]:border-r"
								type="number"
								name={name}
								value={value}
								onChange={onRGBChange}
								onBlur={onRGBBlur}
							/>
						))}
					</span>
					<span
						className="inline-flex h-full"
						style={{ display: colorFormat === "HSL" ? "" : "none" }}
					>
						{hslInputList.map(({ name, value }) => (
							<input
								key={name}
								className="h-full w-full border-slate-200 px-0.5 text-center outline-none [&:not(:last-child)]:border-r"
								type="number"
								name={name}
								value={value}
								onChange={onHSLChange}
								onBlur={onHSLBlur}
							/>
						))}
					</span>
				</span>
				<span className="inline-flex h-full items-center border-slate-200 border-l">
					<input
						className="w-8 px-1 text-center outline-none"
						type="number"
						value={inputAlpha}
						onChange={onAlphaChange}
						onBlur={onAlphaBlur}
					/>
					<span className="w-4">%</span>
				</span>
			</span>
		</div>
	);
};
