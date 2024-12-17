import { useState } from "react";

import type { HSLFormat } from "@utilities";

import {
	InputColorFormat,
	type OnColorFormatChangeFn,
} from "../InputColorFormat";
import { RemoveColorIcon } from "../SVGs";
import { CheckIcon } from "../SVGs/CheckIcon";
import { type OnSpectrumColorChangeFn, SpectrumColor } from "../SpectrumColor";

import type {
	ColorPaletteOnClickFn,
	ColorPaletteProps,
	ColorPanelProps,
	TabList,
	TabName,
} from "./ColorPanel-types";

const ColorPalette = ({
	paletteColors,
	paletteCols,
	isHidden,
	onClick,
}: ColorPaletteProps) => {
	return (
		<div
			className="grid justify-center gap-0.5"
			style={{
				display: isHidden ? "none" : "",
				gridTemplateColumns: `repeat(${paletteCols}, auto)`,
			}}
		>
			{paletteColors.map((backgroundColor) => (
				<button
					type="button"
					key={backgroundColor}
					className="relative inline-block h-5 w-5 scale-100 outline-primary transition-[transform] hover:z-10 hover:scale-125 hover:outline"
					style={{ backgroundColor }}
					onClick={() => onClick(backgroundColor)}
				/>
			))}
		</div>
	);
};

export const ColorPanel = ({
	activeColors,
	onSelectedColor,
}: ColorPanelProps) => {
	const [hsl, setHSL] = useState<HSLFormat>({ h: 289, s: 86, l: 24, a: 0.5 });

	const [activeTabName, setActiveTabName] = useState<TabName>("Spectrum");

	const tabList: TabList = [
		{ name: "Grid", anchorName: "--grid-anchor" },
		{ name: "Spectrum", anchorName: "--spectrum-anchor" },
	];

	const tabItem = tabList.find(({ name }) => name === activeTabName);

	if (!tabItem) {
		throw new Error("ActiveAnchor can't be undefined.");
	}

	const activeAnchorName = tabItem.anchorName;

	const activeTabBgSpace = 3;

	const paletteRows = 11;
	const paletteCols = 10;

	const gridFilledColors = Array.from(
		{ length: paletteRows - 3 },
		(_, rowIndex) =>
			Array.from({ length: paletteCols }, (_, colIndex) => {
				const hue = (360 / paletteCols) * colIndex;

				const saturation = (100 / paletteRows) * (paletteRows - rowIndex);

				const lightness = (100 / paletteRows) * (paletteRows - (rowIndex + 1));

				return `hsl(${hue}deg, ${saturation}%, ${lightness}%, 1)`;
			}),
	);

	const grayColors = [
		...Array.from({ length: paletteCols - 1 }, (_, index) => {
			const lightness = 100 - index * (100 / paletteCols);

			return `hsl(0deg, 0%, ${lightness}%, 1)`;
		}),
		"hsl(0deg, 0%, 0%, 1)",
	];

	const gridPaletteColors = [grayColors, ...gridFilledColors].flat();

	const colorPaletteClick: ColorPaletteOnClickFn = (color) => {
		const matchedColor = color.match(/\d+(\.\d+)?/g);

		if (!matchedColor) {
			throw new Error("Colors wasn't found.");
		}

		const [hue, saturation, lightness, alpha] = matchedColor;

		const h = +hue;
		const s = Math.round(+saturation);
		const l = Math.round(+lightness);
		const a = +(+alpha).toFixed(2);

		onSelectedColor({ hsl: { h, s, l, a } });
	};

	const onSpectrumColorChange: OnSpectrumColorChangeFn = ({ hsl }) => {
		setHSL(hsl);
	};

	const onColorFormatChange: OnColorFormatChangeFn = ({ hsl }) => {
		setHSL(hsl);
	};

	return (
		<div className="flex w-64 flex-col rounded-lg border border-slate-200 bg-slate-50 p-1">
			<div className="mb-2 flex justify-around rounded-lg bg-slate-100 ">
				{tabList.map(({ name, anchorName }) => (
					<button
						key={name}
						type="button"
						className="flex-auto py-3 font-semibold text-slate-700 text-sm transition-colors duration-200"
						style={{
							// @ts-ignore
							anchorName,
							color: activeTabName === name ? "var(--primary-color)" : "",
						}}
						onClick={() => setActiveTabName(name)}
					>
						{name}
					</button>
				))}
				<span
					className="pointer-events-none absolute rounded-lg"
					style={{
						// @ts-ignore
						positionAnchor: activeAnchorName,
						left: `calc(anchor(left) + ${activeTabBgSpace}px)`,
						right: `calc(anchor(right) + ${activeTabBgSpace}px)`,
						alignSelf: "anchor-center",
						height: `calc(anchor-size(height) - ${activeTabBgSpace * 2}px)`,
						transition: "left 200ms, right 200ms",
						border:
							"1px solid color(from var(--primary-color) srgb r g b / 0.3)",
						backgroundColor:
							"color(from var(--primary-color) srgb r g b / 0.2)",
					}}
				/>
			</div>
			<button
				type="button"
				className="mb-2 inline-flex items-center gap-2 self-start rounded-md border border-slate-200 bg-slate-200 px-3 py-1 font-semibold text-slate-600 text-sm transition-colors hover:border-slate-300 hover:bg-opacity-70"
				onClick={() => onSelectedColor({ hsl: null })}
			>
				<RemoveColorIcon /> Remove color
			</button>
			<div className="self-center pb-2">
				<div className="pb-2">
					<ColorPalette
						paletteColors={gridPaletteColors}
						paletteCols={paletteCols}
						isHidden={activeTabName !== "Grid"}
						onClick={colorPaletteClick}
					/>
					<div style={{ display: activeTabName === "Spectrum" ? "" : "none" }}>
						<SpectrumColor
							hsl={hsl}
							panelWidth={240}
							panelHeight={120}
							onColorChange={onSpectrumColorChange}
						/>
						<InputColorFormat hsl={hsl} onColorChange={onColorFormatChange} />
						<button
							type="button"
							className="mt-1 inline-flex items-center gap-1 self-start rounded-md border border-slate-200 bg-slate-200 px-3 py-1 font-semibold text-slate-600 text-sm transition-colors hover:border-slate-300 hover:bg-opacity-70"
							onClick={() => onSelectedColor({ hsl })}
						>
							<CheckIcon size={0.8} /> Apply color
						</button>
					</div>
				</div>
				<div
					className="inline-flex flex-col items-center"
					style={{ display: activeColors.length ? "" : "none" }}
				>
					<div>
						<span className="inline-block pb-1 font-semibold text-slate-600 text-sm">
							Active colors
						</span>
						<ColorPalette
							paletteColors={activeColors}
							paletteCols={paletteCols}
							isHidden={false}
							onClick={colorPaletteClick}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
