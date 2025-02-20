import { useRef, useState } from "react";

import { cellBorderStyles, tableLayoutViewOptions } from "@externalStores";
import { Color, type HSLFormat, getPixelFromInput } from "@utilities";

import { ColorInput } from "../../../ColorInput";
import type { OnColorSelected } from "../../../ColorPanel";
import { ComboBox, type ComboBoxList } from "../../../ComboBox";
import {
	type OnPrimaryCharInputChangeFn,
	PrimaryCharInput,
} from "../../../PrimaryCharInput";
import { RadioButtons, type RadioButtonsList } from "../../../RadioButtons";
import { AlignBottomIcon, AlignMiddleIcon, AlignTopIcon } from "../../../SVGs";

import { getValidBorderStyle } from "../Utilities";

import type {
	CellPropertiesProps,
	GetBorderWidthForActionReturn,
} from "./CellProperties-types";

export const CellProperties = ({
	layoutView,
	updateLayoutView,
	cellProps,
	setCellProps,
	onCellPropertiesAction,
}: CellPropertiesProps) => {
	const borderWidthInputRef = useRef<HTMLInputElement>(null);

	const [isBorderWidthValid, setIsBorderWidthValid] = useState(true);

	const alignmentButtons: RadioButtonsList = [
		{
			checked: cellProps.verticalAlign === "top",
			children: <AlignTopIcon className="w-6" />,
			onClick: () => setCellProps({ verticalAlign: "top" }),
		},
		{
			checked: cellProps.verticalAlign === "baseline",
			children: <AlignMiddleIcon className="w-6" />,
			onClick: () => setCellProps({ verticalAlign: "baseline" }),
		},
		{
			checked: cellProps.verticalAlign === "bottom",
			children: <AlignBottomIcon className="w-6" />,
			onClick: () => setCellProps({ verticalAlign: "bottom" }),
		},
	];

	const cellBorderPropsList: ComboBoxList = cellBorderStyles.map(
		(borderStyle) => {
			const capitalizedBorderStyle =
				borderStyle[0].toUpperCase() + borderStyle.slice(1);

			const onClick = () => {
				setCellProps({ borderStyle });
			};

			return { id: borderStyle, children: capitalizedBorderStyle, onClick };
		},
	);

	const validBorderStyle = getValidBorderStyle({
		borderStyle: cellProps.borderStyle,
		validBorderStyles: cellBorderStyles,
	});

	const tableBorderStyleComboBoxTitle =
		validBorderStyle[0].toUpperCase() + validBorderStyle.slice(1);

	const onBorderColorSelected: OnColorSelected = ({ hsl }) => {
		const definedHSL: HSLFormat = hsl || { h: 0, s: 0, l: 0, a: 0 };

		if (hsl === null) {
			setCellProps({ borderColor: "transparent" });
		}

		const { hex } = Color.hsl(definedHSL).hex();

		setCellProps({ borderColor: hex });
	};

	const onBorderWidthChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setIsBorderWidthValid(true);

		setCellProps({ borderWidth: value });
	};

	const onBackgroundSelected: OnColorSelected = ({ hsl }) => {
		const definedHSL: HSLFormat = hsl || { h: 0, s: 0, l: 0, a: 0 };

		if (hsl === null) {
			setCellProps({ backgroundColor: "transparent" });
		}

		const { hex } = Color.hsl(definedHSL).hex();

		setCellProps({ backgroundColor: hex });
	};

	const closePanel = () => {
		setIsBorderWidthValid(true);

		updateLayoutView();
	};

	const onCancel = () => {
		onCellPropertiesAction({ type: "cancel" });

		closePanel();
	};

	const getBorderWidthForAction = (): GetBorderWidthForActionReturn => {
		if (cellProps.borderWidth === undefined || cellProps.borderWidth === "") {
			return { isInvalid: false, borderWidth: undefined };
		}

		const pixelValue = getPixelFromInput({ input: cellProps.borderWidth });

		if (pixelValue !== null) {
			const adjustedPixel = Math.min(10, Math.max(0, pixelValue));

			return { isInvalid: false, borderWidth: `${adjustedPixel}px` };
		}

		return { isInvalid: true };
	};

	const onApply = () => {
		const borderWidthForAction = getBorderWidthForAction();

		if (borderWidthForAction.isInvalid) {
			setIsBorderWidthValid(false);

			if (!borderWidthInputRef.current) {
				throw new Error("BorderWidthInputRef can't be null.");
			}

			borderWidthInputRef.current.focus();

			return;
		}

		const verticalAlign = (
			{
				top: "top",
				baseline: null,
				bottom: "bottom",
			} as const
		)[cellProps.verticalAlign];

		onCellPropertiesAction({
			type: "apply",
			borderStyle: cellProps.borderStyle,
			borderColor: cellProps.borderColor,
			borderWidth: borderWidthForAction.borderWidth,
			backgroundColor: cellProps.backgroundColor,
			verticalAlign,
		});

		closePanel();
	};
	return (
		<div
			className="w-72 p-2"
			style={{
				display:
					layoutView === tableLayoutViewOptions.tableCellProperties
						? ""
						: "none",
			}}
		>
			<div>Cell Properties</div>
			<hr className="my-1" />
			<div className="flex flex-col gap-2">
				<div>
					<span className="font mb-1 inline-block font-semibold text-sm">
						Border
					</span>
					<div className="flex h-8 items-center gap-1">
						<ComboBox
							buttonChildren={tableBorderStyleComboBoxTitle}
							list={cellBorderPropsList}
							className="h-full"
							buttonStyles={{ minWidth: "80px" }}
						/>
						<ColorInput
							color={cellProps.borderColor}
							className="h-full"
							onColorSelected={onBorderColorSelected}
						/>
						<PrimaryCharInput
							inputRef={borderWidthInputRef}
							inputProps={{
								type: "text",
								value: cellProps.borderWidth,
								onChange: onBorderWidthChange,
								style: { height: "100%" },
							}}
							title="Width"
							className="h-full w-24"
							isInvalid={!isBorderWidthValid}
							invalidMessage="Allowed format: px"
						/>
					</div>
				</div>
				<div className="flex gap-2">
					<div className="flex basis-7/12 flex-col gap-2">
						<span className="font font-semibold text-sm">Background</span>
						<div className="flex h-8 items-center gap-1">
							<ColorInput
								color={cellProps.backgroundColor}
								className="h-full"
								onColorSelected={onBackgroundSelected}
							/>
						</div>
					</div>
					<div className="flex basis-5/12 flex-col gap-2">
						<span className="font font-semibold text-sm">Alignment</span>
						<RadioButtons buttons={alignmentButtons} />
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
