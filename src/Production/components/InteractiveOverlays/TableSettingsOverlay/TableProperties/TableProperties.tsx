import { useEffect, useRef, useState } from "react";

import {
	type TableBorderStyle,
	type TableBorderWidth,
	type TableHeight,
	type TableWidth,
	tableBorderStyles,
	tableLayoutViewOptions,
} from "@externalStores";
import {
	Color,
	type HSLFormat,
	getPercentageFromInput,
	getPixelFromInput,
} from "@utilities";

import { ColorPanel, type OnColorSelected } from "../../../ColorPanel";
import { PrimaryButton } from "../../../PrimaryButton";
import {
	type OnPrimaryCharInputChangeFn,
	PrimaryCharInput,
} from "../../../PrimaryCharInput";
import {
	ChevronIcon,
	ContentAlignCenterIcon,
	ContentAlignLeftIcon,
	ContentAlignRightIcon,
} from "../../../SVGs";

import type {
	Alignment,
	AlignmentButtons,
	GetValidHSLFromHexProps,
	GetValidHSLFromHexReturn,
	TableBorderPropsList,
	TablePropertiesProps,
} from "./TableProperties-types";

const getValidHSLFormatFromHex = (
	hex: GetValidHSLFromHexProps,
): GetValidHSLFromHexReturn => {
	const hexColor = Color.hex({ hex });

	if (hexColor.isValid()) {
		return hexColor.hexToHsl();
	}

	return { h: 0, s: 0, l: 0, a: 1 };
};

export const TableProperties = ({
	layoutView,
	setLayoutView,
	tableProps,
	onTablePropertiesAction,
}: TablePropertiesProps) => {
	const borderStyleButtonRef = useRef<HTMLButtonElement>(null);
	const borderStyleDropdownRef = useRef<HTMLDivElement>(null);

	const borderColorButtonRef = useRef<HTMLButtonElement>(null);
	const borderColorDropdownRef = useRef<HTMLDivElement>(null);

	const [tableWidth, setTableWidth] = useState<string>(tableProps.width);
	const [tableHeight, setTableHeight] = useState<string>(tableProps.height);

	const [selectedAlignment, setSelectedAlignment] = useState<Alignment>(
		tableProps.alignment,
	);

	const [selectedBorderStyle, setSelectedBorderStyle] =
		useState<TableBorderStyle>(tableProps.borderStyle);

	const [selectedBorderColor, setSelectedBorderColor] = useState(
		tableProps.borderColor,
	);

	const [borderWidth, setBorderWidth] = useState<string>(
		tableProps.borderWidth,
	);

	useEffect(() => {
		setTableHeight(tableProps.width);
		setTableHeight(tableProps.height);
		setSelectedAlignment(tableProps.alignment);
		setSelectedBorderStyle(tableProps.borderStyle);
		setSelectedBorderColor(tableProps.borderColor);
		setBorderWidth(tableProps.borderWidth);
	}, [tableProps]);

	useEffect(() => {
		const borderStyleButton = borderStyleButtonRef.current;
		const borderStyleDropdown = borderStyleDropdownRef.current;

		const borderColorButton = borderColorButtonRef.current;
		const borderColorDropdown = borderColorDropdownRef.current;

		if (
			!(
				borderStyleButton &&
				borderStyleDropdown &&
				borderColorButton &&
				borderColorDropdown
			)
		) {
			return;
		}

		borderStyleButton.popoverTargetElement = borderStyleDropdown;
		borderColorButton.popoverTargetElement = borderColorDropdown;
	}, []);

	const selectedBorderColorHSL = getValidHSLFormatFromHex(selectedBorderColor);

	const onTableWidthChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setTableWidth(value);
	};

	const onTableHeightChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setTableHeight(value);
	};

	const alignmentButtons: AlignmentButtons = [
		{
			alignment: "left",
			children: <ContentAlignLeftIcon />,
		},
		{
			alignment: "center",
			children: <ContentAlignCenterIcon />,
		},
		{
			alignment: "right",
			children: <ContentAlignRightIcon />,
		},
	];

	const tableBorderStyleAnchor = "--table-border-style";

	const tableBorderProps: TableBorderPropsList = tableBorderStyles.map(
		(borderStyle) => {
			const capitalizedBorderStyle =
				borderStyle[0].toUpperCase() + borderStyle.slice(1);

			const onClick = () => {
				const tableBorderDropdown = borderStyleDropdownRef.current;

				if (!tableBorderDropdown) {
					throw new Error("TableBorderDropdown can't be null.");
				}

				tableBorderDropdown.hidePopover();

				setSelectedBorderStyle(borderStyle);
			};

			return { borderStyle, capitalizedBorderStyle, onClick };
		},
	);

	const capitalizedSelectedTableBorderStyle =
		selectedBorderStyle[0].toUpperCase() + selectedBorderStyle.slice(1);

	const tableBorderColorAnchor = "--table-border-color";

	const onBorderColorSelected: OnColorSelected = ({ hsl }) => {
		const borderColorDropdown = borderColorDropdownRef.current;

		if (!borderColorDropdown) {
			throw new Error("BorderColorDropdown can't be null.");
		}

		borderColorDropdown.hidePopover();

		const definedHSL: HSLFormat = hsl || { h: 0, s: 0, l: 0, a: 0 };

		const { hex } = Color.hsl(definedHSL).hex();

		setSelectedBorderColor(hex);
	};

	const onCancel = () => {
		onTablePropertiesAction({ type: "cancel" });

		setLayoutView(tableLayoutViewOptions.tableIcons);
	};

	const onApply = () => {
		const widthProp = ((): TableWidth => {
			const pixelValue = getPixelFromInput({ input: tableWidth });

			if (pixelValue !== null) {
				const adjustedPixel = Math.min(10000, Math.max(100, pixelValue));
				return `${adjustedPixel}px`;
			}

			const percentageValue = getPercentageFromInput({ input: tableWidth });

			if (percentageValue !== null) {
				return `${percentageValue}%`;
			}

			// If the input value is invalid
			return "500px";
		})();

		const heightProp = ((): TableHeight => {
			const pixelValue = getPixelFromInput({ input: tableWidth });

			if (pixelValue !== null) {
				const adjustedPixel = Math.min(10000, Math.max(100, pixelValue));
				return `${adjustedPixel}px`;
			}

			// If the input value is invalid
			return "500px";
		})();

		const borderWidthProp = ((): TableBorderWidth => {
			const pixelValue = getPixelFromInput({ input: borderWidth });

			if (pixelValue !== null) {
				const adjustedPixel = Math.min(10000, Math.max(100, pixelValue));
				return `${adjustedPixel}px`;
			}

			// If the input value is invalid
			return "1px";
		})();

		onTablePropertiesAction({
			type: "apply",
			width: widthProp,
			height: heightProp,
			alignment: selectedAlignment,
			borderStyle: selectedBorderStyle,
			borderColor: selectedBorderColor,
			borderWidth: borderWidthProp,
		});

		setLayoutView(tableLayoutViewOptions.tableIcons);
	};

	return (
		<div
			className="w-72 p-2"
			style={{
				display:
					layoutView === tableLayoutViewOptions.tableProperties ? "" : "none",
			}}
		>
			<div>Table Properties</div>
			<hr className="my-1" />
			<div className="flex flex-col gap-2">
				<div className="flex gap-2">
					<div className="flex basis-7/12 flex-col gap-2">
						<span className="font font-semibold text-sm">Size</span>
						<div className="flex h-8 items-center gap-1">
							<PrimaryCharInput
								inputProps={{
									type: "text",
									value: tableWidth,
									onChange: onTableWidthChange,
									placeholder: "500px",
									style: { height: "100%" },
								}}
								title="Width"
								className="h-full"
							/>
							<span className="text-sm">x</span>
							<PrimaryCharInput
								inputProps={{
									type: "text",
									value: tableHeight,
									onChange: onTableHeightChange,
									placeholder: "500px",
									style: { height: "100%" },
								}}
								title="Height"
								className="h-full"
							/>
						</div>
					</div>
					<div className="flex basis-5/12 flex-col gap-2">
						<span className="font font-semibold text-sm">Alignment</span>
						<div className="flex h-full rounded-md border">
							{alignmentButtons.map(({ alignment, children }) => (
								<PrimaryButton
									key={alignment}
									checked={alignment === selectedAlignment}
									className="flex-grow justify-center"
									onClick={() => setSelectedAlignment(alignment)}
								>
									{children}
								</PrimaryButton>
							))}
						</div>
					</div>
				</div>
				<div>
					<span className="font mb-1 inline-block font-semibold text-sm">
						Border
					</span>
					<div className="flex h-8 items-center gap-1">
						<span
							className="h-full"
							style={{
								// @ts-ignore
								anchorScope: tableBorderStyleAnchor,
							}}
						>
							<button
								ref={borderStyleButtonRef}
								type="button"
								className="default-btn inline-flex h-full min-w-20 items-center justify-between px-2"
								style={{
									// @ts-ignore
									anchorName: tableBorderStyleAnchor,
								}}
							>
								{capitalizedSelectedTableBorderStyle}
								<ChevronIcon />
							</button>
							<div
								ref={borderStyleDropdownRef}
								className="absolute w-20 flex-col rounded-sm shadow-md [&:popover-open]:flex"
								popover="auto"
								style={{
									// @ts-ignore
									positionAnchor: tableBorderStyleAnchor,
									top: "anchor(bottom)",
									left: "anchor(left)",
								}}
							>
								{tableBorderProps.map(
									({ borderStyle, capitalizedBorderStyle, onClick }) => {
										return (
											<button
												key={borderStyle}
												type="button"
												className="px-2 py-1 text-sm transition-colors hover:bg-slate-100"
												onClick={onClick}
											>
												<span className="inline-block w-full text-start">
													{capitalizedBorderStyle}
												</span>
											</button>
										);
									},
								)}
							</div>
						</span>
						<span
							className="inline-flex h-full"
							style={{
								// @ts-ignore
								anchorScope: tableBorderColorAnchor,
							}}
						>
							<PrimaryCharInput
								inputProps={{
									type: "text",
									value: selectedBorderColor,
									readOnly: true,
									style: { height: "100%" },
								}}
								title="Color"
								className="h-full"
							/>
							<button
								ref={borderColorButtonRef}
								type="button"
								className="inline-flex items-center rounded-sm border border-slate-300 p-1"
								style={{
									// @ts-ignore
									anchorName: tableBorderColorAnchor,
								}}
							>
								<span
									className="inline-block size-5 rounded-sm"
									style={{
										backgroundColor: selectedBorderColor,
									}}
								/>
							</button>
							<div
								ref={borderColorDropdownRef}
								className="mt-1 rounded-lg border border-slate-200 shadow-md"
								popover="auto"
								style={{
									// @ts-ignore
									positionAnchor: tableBorderColorAnchor,
									top: "anchor(bottom)",
									justifySelf: "anchor-center",
								}}
							>
								<ColorPanel
									hsl={selectedBorderColorHSL}
									activeColors={[]}
									onColorSelected={onBorderColorSelected}
								/>
							</div>
						</span>
						<PrimaryCharInput
							inputProps={{
								type: "text",
								value: borderWidth,
								style: { height: "100%" },
							}}
							title="Width"
							className="h-full w-24"
						/>
					</div>
				</div>
				<div className="mt-2 text-right">
					<button
						type="button"
						className="default-btn px-3 py-1"
						onClick={onCancel}
					>
						Cancel
					</button>
					<button
						type="button"
						className="highlighted-btn ml-4 px-3 py-1"
						onClick={onApply}
					>
						Apply
					</button>
				</div>
			</div>
		</div>
	);
};
