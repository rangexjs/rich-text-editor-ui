import { useEffect, useRef } from "react";

import { Color } from "@utilities";

import { ColorPanel, type OnColorSelected } from "../ColorPanel";
import {
	type OnPrimaryCharClickFn,
	PrimaryCharInput,
} from "../PrimaryCharInput";

import type { ColorInputProps } from "./ColorInput-types";

const getValidInputHex = (hex: string | null) => {
	const defaultHex = "#000000ff";

	if (hex === null) {
		return defaultHex;
	}

	const hexColor = Color.hex({ hex });

	if (hexColor.isValid()) {
		return hex;
	}

	return defaultHex;
};

export const ColorInput = ({
	hex,
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

	const validHex = getValidInputHex(hex);

	const inputText = hex === null ? "None" : validHex;

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
				className="inline-flex items-center rounded-sm border border-slate-300 p-1"
				style={{
					// @ts-ignore
					anchorName: colorInputAnchor,
				}}
			>
				<span
					className="inline-block size-5 rounded-sm"
					style={{
						backgroundColor: validHex,
					}}
				/>
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
