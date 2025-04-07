import { useEffect, useState } from "react";

import { Color, type HSLFormat } from "@utilities";

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
	const colorSize = 20;

	return (
		<div
			className="grid justify-center gap-0.5"
			style={{
				display: isHidden ? "none" : "",
				gridTemplateColumns: `repeat(${paletteCols}, ${colorSize}px)`,
			}}
		>
			{paletteColors.map((hslFormat, index) => {
				const backgroundColor = Color.hsl(hslFormat).color();

				return (
					<button
						type="button"
						key={index}
						className="relative inline-block scale-100 outline-primary transition-transform hover:z-10 hover:scale-125 hover:outline-3"
						style={{
							width: `${colorSize}px`,
							height: `${colorSize}px`,
							backgroundColor,
						}}
						onClick={() => onClick(hslFormat)}
					/>
				);
			})}
		</div>
	);
};

export const ColorPanel = ({
	hsl,
	activeColors,
	onColorSelected,
}: ColorPanelProps) => {
	const [scopedHSL, setScopedHSL] = useState<HSLFormat>(
		hsl || { h: 0, s: 0, l: 0, a: 1 },
	);

	const [activeTabName, setActiveTabName] = useState<TabName>("Grid");

	useEffect(() => {
		hsl && setScopedHSL(hsl);
	}, [hsl]);

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
				const h = (360 / paletteCols) * colIndex;

				const s = (100 / paletteRows) * (paletteRows - rowIndex);

				const l = (100 / paletteRows) * (paletteRows - (rowIndex + 1));

				return { h, s, l, a: 1 };
			}),
	);

	const grayColors: HSLFormat[] = [
		...Array.from({ length: paletteCols - 1 }, (_, index) => {
			const l = 100 - index * (100 / paletteCols);

			return { h: 0, s: 0, l: l, a: 1 };
		}),
		{ h: 0, s: 0, l: 0, a: 1 },
	];

	const gridPaletteColors: HSLFormat[] = [
		grayColors,
		...gridFilledColors,
	].flat();

	const colorPaletteClick: ColorPaletteOnClickFn = (hsl) => {
		onColorSelected({ hsl });
	};

	const onSpectrumColorChange: OnSpectrumColorChangeFn = ({ hsl }) => {
		setScopedHSL(hsl);
	};

	const onColorFormatChange: OnColorFormatChangeFn = ({ hsl }) => {
		setScopedHSL(hsl);
	};

	return (
		<div className="flex w-[264px] flex-col bg-white p-1">
			<div className="mb-2 flex justify-around rounded-md bg-slate-50 ">
				{tabList.map(({ name, anchorName }) => (
					<button
						key={name}
						type="button"
						className="flex-auto py-3 font-semibold text-slate-700 text-sm transition-colors duration-200"
						style={{
							// @ts-ignore
							anchorName,
							color: activeTabName === name ? "var(--color-primary)" : "",
						}}
						onClick={() => setActiveTabName(name)}
					>
						{name}
					</button>
				))}
				<span
					className="pointer-events-none absolute rounded-md"
					style={{
						// @ts-ignore
						positionAnchor: activeAnchorName,
						left: `calc(anchor(left) + ${activeTabBgSpace}px)`,
						right: `calc(anchor(right) + ${activeTabBgSpace}px)`,
						alignSelf: "anchor-center",
						height: `calc(anchor-size(height) - ${activeTabBgSpace * 2}px)`,
						transition: "left 200ms, right 200ms",
						border:
							"1px solid color(from var(--color-primary) srgb r g b / 0.3)",
						backgroundColor:
							"color(from var(--color-primary) srgb r g b / 0.2)",
					}}
				/>
			</div>
			<button
				type="button"
				className="default-btn mb-2 inline-flex items-center gap-2 self-start px-3 py-1"
				onClick={() => onColorSelected({ hsl: null })}
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
							hsl={scopedHSL}
							panelWidth={240}
							panelHeight={120}
							onColorChange={onSpectrumColorChange}
						/>
						<InputColorFormat
							hsl={scopedHSL}
							onColorChange={onColorFormatChange}
						/>
						<button
							type="button"
							className="default-btn mt-1 inline-flex items-center gap-1 self-start px-3 py-1"
							onClick={() => onColorSelected({ hsl: scopedHSL })}
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
