import { useEffect, useRef } from "react";

import { Color } from "@utilities";

import { ColorPanel, type OnColorSelected } from "../ColorPanel";
import {
	type OnPrimaryCharClickFn,
	PrimaryCharInput,
} from "../PrimaryCharInput";

import type {
	ColorInputProps,
	GetValidInputHexProps,
	GetValidInputHexReturn,
} from "./ColorInput-types";

const getValidInputHex = (
	color: GetValidInputHexProps,
): GetValidInputHexReturn => {
	const defaultHex = "#00000000";

	if (color === undefined) {
		return defaultHex;
	}

	try {
		const hsl = Color.fromColor({ color }).hslFormat();

		const { hex } = Color.hsl(hsl).hex();

		return hex;
	} catch {
		console.warn("Color format couldn't be processed.", { color: color });

		return defaultHex;
	}
};

export const ColorInput = ({
	color,
	className,
	onColorSelected,
}: ColorInputProps) => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const button = buttonRef.current;
		const dropdown = dropdownRef.current;
		if (!(button && dropdown)) {
			return;
		}

		button.popoverTargetElement = dropdown;
	}, []);

	const validHex = getValidInputHex(color);

	const isTransparent = !!validHex.endsWith("00");

	const inputText = color === null ? "None" : validHex;

	const hsl = Color.hex({ hex: validHex }).hexToHsl();

	const colorInputAnchor = "--color-input-anchor";

	const onColorInputSelected: OnColorSelected = ({ hsl }) => {
		const dropdown = dropdownRef.current;

		if (!dropdown) {
			throw new Error("Dropdown can't be null.");
		}

		dropdown.hidePopover();

		onColorSelected({ hsl });
	};

	const onCharInputClick: OnPrimaryCharClickFn = ({ event }) => {
		const button = buttonRef.current;

		if (!button) {
			throw new Error("Button can't be null.");
		}

		const { currentTarget } = event;

		if (!(currentTarget instanceof HTMLInputElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		currentTarget.blur();

		button.click();
	};

	const squareBackgroundColor = isTransparent ? "#888" : validHex;

	return (
		<span
			className={`inline-flex ${className}`}
			style={{
				// @ts-ignore
				anchorScope: colorInputAnchor,
			}}
		>
			<PrimaryCharInput
				inputProps={{
					type: "text",
					value: inputText,
					readOnly: true,
					style: { height: "100%" },
					onClick: onCharInputClick,
				}}
				title="Color"
				className="h-full"
			/>
			<button
				ref={buttonRef}
				type="button"
				className="inline-flex items-center rounded-xs border border-slate-300 p-1"
				style={{
					// @ts-ignore
					anchorName: colorInputAnchor,
				}}
			>
				<span
					className="relative inline-flex size-5 items-center justify-center overflow-clip rounded-xs"
					style={{
						backgroundColor: squareBackgroundColor,
					}}
				>
					<span
						className="absolute inline-block h-8 w-1 rotate-45 bg-red-500"
						style={{ display: isTransparent ? "" : "none" }}
					/>
				</span>
			</button>
			<div
				ref={dropdownRef}
				className="mt-1 rounded-lg border border-slate-200 shadow-md"
				popover="auto"
				style={{
					// @ts-ignore
					positionAnchor: colorInputAnchor,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
				}}
			>
				<ColorPanel
					hsl={hsl}
					activeColors={[]}
					onColorSelected={onColorInputSelected}
				/>
			</div>
		</span>
	);
};
