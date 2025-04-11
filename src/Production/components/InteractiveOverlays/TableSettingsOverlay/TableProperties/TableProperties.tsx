import { useRef, useState } from "react";

import {
	Color,
	type HSLFormat,
	getPercentageFromInput,
	getPixelFromInput,
} from "@utilities";

import { ColorInput } from "../../../ColorInput";
import type { OnColorSelected } from "../../../ColorPanel";
import { ComboBox, type ComboBoxList } from "../../../ComboBox";
import {
	type OnPrimaryCharInputChangeFn,
	PrimaryCharInput,
} from "../../../PrimaryCharInput";
import { RadioButtons, type RadioButtonsList } from "../../../RadioButtons";
import {
	ContentAlignCenterIcon,
	ContentAlignLeftIcon,
	ContentAlignRightIcon,
} from "../../../SVGs";

import { getValidBorderStyle } from "../Utilities";

import type {
	GetTableBorderWidthForActionReturn,
	GetTableHeightForActionReturn,
	GetTableWidthForActionReturn,
	InputValidity,
	TablePropertiesProps,
} from "./TableProperties-types";

export const tableBorderStyles = [
	"solid",
	"dotted",
	"dashed",
	"double",
	"groove",
	"ridge",
	"inset",
	"outset",
	"none",
	"hidden",
];

export const TableProperties = ({
	shouldDisplay,
	onClose,
	tableProps,
	updateTableProps,
	onTablePropertiesAction,
}: TablePropertiesProps) => {
	const tableWidthInputRef = useRef<HTMLInputElement>(null);
	const tableHeightInputRef = useRef<HTMLInputElement>(null);
	const borderWidthInputRef = useRef<HTMLInputElement>(null);

	const [inputValidity, setInputValidity] = useState<InputValidity>({
		tableWidth: true,
		tableHeight: true,
		borderWidth: true,
	});

	const onTableWidthChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setInputValidity((prev) => ({ ...prev, tableWidth: true }));

		updateTableProps({ width: value });
	};

	const onTableHeightChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setInputValidity((prev) => ({ ...prev, tableHeight: true }));

		updateTableProps({ height: value });
	};

	const alignmentButtons: RadioButtonsList = [
		{
			checked: tableProps.alignment === "left",
			children: <ContentAlignLeftIcon />,
			onClick: () => updateTableProps({ alignment: "left" }),
		},
		{
			checked: tableProps.alignment === "center",
			children: <ContentAlignCenterIcon />,
			onClick: () => updateTableProps({ alignment: "center" }),
		},
		{
			checked: tableProps.alignment === "right",
			children: <ContentAlignRightIcon />,
			onClick: () => updateTableProps({ alignment: "right" }),
		},
	];

	const tableBorderPropsList: ComboBoxList = tableBorderStyles.map(
		(borderStyle) => {
			const capitalizedBorderStyle =
				borderStyle[0].toUpperCase() + borderStyle.slice(1);

			const onClick = () => {
				updateTableProps({ borderStyle });
			};

			return { id: borderStyle, children: capitalizedBorderStyle, onClick };
		},
	);

	const validBorderStyle = getValidBorderStyle({
		borderStyle: tableProps.borderStyle,
		validBorderStyles: tableBorderStyles,
	});

	const tableBorderStyleComboBoxTitle =
		validBorderStyle[0].toUpperCase() + validBorderStyle.slice(1);

	const onBorderColorSelected: OnColorSelected = ({ hsl }) => {
		const definedHSL: HSLFormat = hsl || { h: 0, s: 0, l: 0, a: 0 };

		if (hsl === null) {
			updateTableProps({ borderColor: "transparent" });
		}

		const { hex } = Color.hsl(definedHSL).hex();

		updateTableProps({ borderColor: hex });
	};

	const onBorderWidthChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setInputValidity((prev) => ({ ...prev, borderWidth: true }));

		updateTableProps({ borderWidth: value });
	};

	const closePanel = () => {
		setInputValidity({
			tableWidth: true,
			tableHeight: true,
			borderWidth: true,
		});

		onClose();
	};

	const onCancel = () => {
		onTablePropertiesAction?.({ type: "cancel" });

		closePanel();
	};

	const getTableWidthForAction = (): GetTableWidthForActionReturn => {
		if (tableProps.width === undefined || tableProps.width === undefined) {
			return { isInvalid: false, tableWidth: undefined };
		}

		const pixelValue = getPixelFromInput({ input: tableProps.width });

		if (pixelValue !== null) {
			const adjustedPixel = Math.min(10000, Math.max(100, pixelValue));
			return { isInvalid: false, tableWidth: `${adjustedPixel}px` };
		}

		const percentageValue = getPercentageFromInput({
			input: tableProps.width,
		});

		if (percentageValue !== null) {
			return { isInvalid: false, tableWidth: `${percentageValue}%` };
		}

		return { isInvalid: true };
	};

	const getTableHeightForAction = (): GetTableHeightForActionReturn => {
		if (tableProps.height === undefined || tableProps.height === "") {
			return { isInvalid: false, tableHeight: undefined };
		}

		const pixelValue = getPixelFromInput({ input: tableProps.height });

		if (pixelValue !== null) {
			const adjustedPixel = Math.min(10000, Math.max(100, pixelValue));

			return { isInvalid: false, tableHeight: `${adjustedPixel}px` };
		}

		return { isInvalid: true };
	};

	const getTableBorderWidthForAction =
		(): GetTableBorderWidthForActionReturn => {
			if (
				tableProps.borderWidth === undefined ||
				tableProps.borderWidth === ""
			) {
				return { isInvalid: false, borderWidth: undefined };
			}

			const pixelValue = getPixelFromInput({ input: tableProps.borderWidth });

			if (pixelValue !== null) {
				const adjustedPixel = Math.min(20, Math.max(0, pixelValue));

				return { isInvalid: false, borderWidth: `${adjustedPixel}px` };
			}

			return { isInvalid: true };
		};

	const onApply = () => {
		const tableWidthForAction = getTableWidthForAction();

		if (tableWidthForAction.isInvalid) {
			setInputValidity((prev) => ({ ...prev, tableWidth: false }));

			if (!tableWidthInputRef.current) {
				throw new Error("TableWidthInputRef can't be null.");
			}

			tableWidthInputRef.current.focus();

			return;
		}

		const tableHeightForAction = getTableHeightForAction();

		if (tableHeightForAction.isInvalid) {
			setInputValidity((prev) => ({ ...prev, tableHeight: false }));

			if (!tableHeightInputRef.current) {
				throw new Error("TableHeightInputRef can't be null.");
			}

			tableHeightInputRef.current.focus();

			return;
		}

		const borderWidthForAction = getTableBorderWidthForAction();

		if (borderWidthForAction.isInvalid) {
			setInputValidity((prev) => ({ ...prev, borderWidth: false }));

			if (!borderWidthInputRef.current) {
				throw new Error("BorderBWidthInputRef can't be null.");
			}

			borderWidthInputRef.current.focus();

			return;
		}

		onTablePropertiesAction?.({
			type: "apply",
			width: tableWidthForAction.tableWidth,
			height: tableHeightForAction.tableHeight,
			alignment: tableProps.alignment,
			borderStyle: tableProps.borderStyle,
			borderColor: tableProps.borderColor,
			borderWidth: borderWidthForAction.borderWidth,
		});

		closePanel();
	};

	const display = shouldDisplay ? "" : "none";

	return (
		<div className="w-72 p-2" style={{ display }}>
			<div>Table Properties</div>
			<hr className="my-1" />
			<div className="flex flex-col gap-2">
				<div className="flex gap-2">
					<div className="flex basis-7/12 flex-col gap-2">
						<span className="font font-semibold text-sm">Size</span>
						<div className="flex h-8 items-center gap-1">
							<PrimaryCharInput
								inputRef={tableWidthInputRef}
								inputProps={{
									type: "text",
									value: tableProps.width,
									onChange: onTableWidthChange,
									placeholder: "500px",
									style: { height: "100%" },
								}}
								title="Width"
								className="h-full"
								isInvalid={!inputValidity.tableWidth}
								invalidMessage="Allowed formats: px, %"
							/>
							<span className="text-sm">x</span>
							<PrimaryCharInput
								inputRef={tableHeightInputRef}
								inputProps={{
									type: "text",
									value: tableProps.height,
									onChange: onTableHeightChange,
									placeholder: "500px",
									style: { height: "100%" },
								}}
								title="Height"
								className="h-full"
								isInvalid={!inputValidity.tableHeight}
								invalidMessage="Allowed formats: px"
							/>
						</div>
					</div>
					<div className="flex basis-5/12 flex-col gap-2">
						<span className="font font-semibold text-sm">Alignment</span>
						<RadioButtons
							buttons={alignmentButtons}
							className="rounded-md border border-slate-300"
						/>
					</div>
				</div>
				<div>
					<span className="font mb-1 inline-block font-semibold text-sm">
						Border
					</span>
					<div className="flex h-8 items-center gap-1">
						<ComboBox
							buttonChildren={tableBorderStyleComboBoxTitle}
							list={tableBorderPropsList}
							className="h-full"
							buttonStyles={{ minWidth: "80px" }}
						/>
						<ColorInput
							color={tableProps.borderColor}
							className="h-full"
							onColorSelected={onBorderColorSelected}
						/>
						<PrimaryCharInput
							inputRef={borderWidthInputRef}
							inputProps={{
								type: "text",
								value: tableProps.borderWidth,
								onChange: onBorderWidthChange,
								style: { height: "100%" },
							}}
							title="Width"
							className="h-full w-24"
							isInvalid={!inputValidity.borderWidth}
							invalidMessage="Allowed formats: px"
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
