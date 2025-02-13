import {
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

import type { TablePropertiesProps } from "./TableProperties-types";

export const TableProperties = ({
	layoutView,
	updateLayoutView,
	tableProps,
	setTableProps,
	onTablePropertiesAction,
}: TablePropertiesProps) => {
	const onTableWidthChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setTableProps({ width: value });
	};

	const onTableHeightChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setTableProps({ height: value });
	};

	const alignmentButtons: RadioButtonsList = [
		{
			checked: tableProps.alignment === "left",
			children: <ContentAlignLeftIcon />,
			onClick: () => setTableProps({ alignment: "left" }),
		},
		{
			checked: tableProps.alignment === "center",
			children: <ContentAlignCenterIcon />,
			onClick: () => setTableProps({ alignment: "center" }),
		},
		{
			checked: tableProps.alignment === "right",
			children: <ContentAlignRightIcon />,
			onClick: () => setTableProps({ alignment: "right" }),
		},
	];

	const tableBorderPropsList: ComboBoxList = tableBorderStyles.map(
		(borderStyle) => {
			const capitalizedBorderStyle =
				borderStyle[0].toUpperCase() + borderStyle.slice(1);

			const onClick = () => {
				setTableProps({ borderStyle });
			};

			return { id: borderStyle, children: capitalizedBorderStyle, onClick };
		},
	);

	const tableBorderStyleComboBoxTitle =
		tableProps.borderStyle[0].toUpperCase() + tableProps.borderStyle.slice(1);

	const onBorderColorSelected: OnColorSelected = ({ hsl }) => {
		const definedHSL: HSLFormat = hsl || { h: 0, s: 0, l: 0, a: 0 };

		if (hsl === null) {
			setTableProps({ borderColor: "transparent" });
		}

		const { hex } = Color.hsl(definedHSL).hex();

		setTableProps({ borderColor: hex });
	};

	const onCancel = () => {
		onTablePropertiesAction({ type: "cancel" });

		updateLayoutView();
	};

	const onApply = () => {
		const widthProp = ((): TableWidth => {
			const pixelValue = getPixelFromInput({ input: tableProps.width });

			if (pixelValue !== null) {
				const adjustedPixel = Math.min(10000, Math.max(100, pixelValue));
				return `${adjustedPixel}px`;
			}

			const percentageValue = getPercentageFromInput({
				input: tableProps.width,
			});

			if (percentageValue !== null) {
				return `${percentageValue}%`;
			}

			// If the input value is invalid
			return "500px";
		})();

		const heightProp = ((): TableHeight => {
			const pixelValue = getPixelFromInput({ input: tableProps.height });

			if (pixelValue !== null) {
				const adjustedPixel = Math.min(10000, Math.max(100, pixelValue));
				return `${adjustedPixel}px`;
			}

			// If the input value is invalid
			return "500px";
		})();

		const borderWidthProp = ((): TableBorderWidth => {
			if (!tableProps.borderWidth) {
				return "0px";
			}

			const pixelValue = getPixelFromInput({ input: tableProps.borderWidth });

			if (pixelValue !== null) {
				const adjustedPixel = Math.min(10000, Math.max(100, pixelValue));
				return `${adjustedPixel}px`;
			}

			// If the input value is invalid
			return "0px";
		})();

		onTablePropertiesAction({
			type: "apply",
			width: widthProp,
			height: heightProp,
			alignment: tableProps.alignment,
			borderStyle: tableProps.borderStyle,
			borderColor: tableProps.borderColor,
			borderWidth: borderWidthProp,
		});

		updateLayoutView();
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
									value: tableProps.width,
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
									value: tableProps.height,
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
						<RadioButtons buttons={alignmentButtons} />
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
							hex={tableProps.borderColor}
							className="h-full"
							onColorSelected={onBorderColorSelected}
						/>
						<PrimaryCharInput
							inputProps={{
								type: "text",
								value: tableProps.borderWidth,
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
