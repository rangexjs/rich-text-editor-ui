import {
	type CellBorderWidth,
	cellBorderStyles,
	tableLayoutViewOptions,
} from "@externalStores";
import { Color, type HSLFormat, getPixelFromInput } from "@utilities";

import { ColorInput } from "../../../ColorInput";
import type { OnColorSelected } from "../../../ColorPanel";
import { ComboBox, type ComboBoxList } from "../../../ComboBox";
import { PrimaryCharInput } from "../../../PrimaryCharInput";
import { RadioButtons, type RadioButtonsList } from "../../../RadioButtons";
import { AlignBottomIcon, AlignMiddleIcon, AlignTopIcon } from "../../../SVGs";

import type { CellPropertiesProps } from "./CellProperties-types";

export const CellProperties = ({
	layoutView,
	setLayoutView,
	cellProps,
	setCellProps,
	onCellPropertiesAction,
}: CellPropertiesProps) => {
	const alignmentButtons: RadioButtonsList = [
		{
			checked: cellProps.alignment === "top",
			children: <AlignTopIcon />,
			onClick: () => setCellProps({ alignment: "top" }),
		},
		{
			checked: cellProps.alignment === "middle",
			children: <AlignMiddleIcon />,
			onClick: () => setCellProps({ alignment: "middle" }),
		},
		{
			checked: cellProps.alignment === "bottom",
			children: <AlignBottomIcon />,
			onClick: () => setCellProps({ alignment: "bottom" }),
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

	const tableBorderStyleComboBoxTitle =
		cellProps.borderStyle[0].toUpperCase() + cellProps.borderStyle.slice(1);

	const onBorderColorSelected: OnColorSelected = ({ hsl }) => {
		const definedHSL: HSLFormat = hsl || { h: 0, s: 0, l: 0, a: 0 };

		if (hsl === null) {
			setCellProps({ borderColor: "transparent" });
		}

		const { hex } = Color.hsl(definedHSL).hex();

		setCellProps({ borderColor: hex });
	};

	const onBackgroundSelected: OnColorSelected = ({ hsl }) => {
		const definedHSL: HSLFormat = hsl || { h: 0, s: 0, l: 0, a: 0 };

		if (hsl === null) {
			setCellProps({ background: "transparent" });
		}

		const { hex } = Color.hsl(definedHSL).hex();

		setCellProps({ background: hex });
	};

	const onCancel = () => {
		onCellPropertiesAction({ type: "cancel" });

		setLayoutView(tableLayoutViewOptions.tableIcons);
	};

	const onApply = () => {
		const borderWidthProp = ((): CellBorderWidth => {
			if (!cellProps.borderWidth) {
				return "0px";
			}

			const pixelValue = getPixelFromInput({ input: cellProps.borderWidth });

			if (pixelValue !== null) {
				const adjustedPixel = Math.min(10000, Math.max(100, pixelValue));
				return `${adjustedPixel}px`;
			}

			// If the input value is invalid
			return "0px";
		})();

		onCellPropertiesAction({
			type: "apply",
			borderStyle: cellProps.borderStyle,
			borderColor: cellProps.borderColor,
			borderWidth: borderWidthProp,
			background: cellProps.background,
			alignment: cellProps.alignment,
		});

		setLayoutView(tableLayoutViewOptions.tableIcons);
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
							hex={cellProps.borderColor}
							className="h-full"
							onColorSelected={onBorderColorSelected}
						/>
						<PrimaryCharInput
							inputProps={{
								type: "text",
								value: cellProps.borderWidth,
								style: { height: "100%" },
							}}
							title="Width"
							className="h-full w-24"
						/>
					</div>
				</div>
				<div className="flex gap-2">
					<div className="flex basis-7/12 flex-col gap-2">
						<span className="font font-semibold text-sm">Background</span>
						<div className="flex h-8 items-center gap-1">
							<ColorInput
								hex={cellProps.background}
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
