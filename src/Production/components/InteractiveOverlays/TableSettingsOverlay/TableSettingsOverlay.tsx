import { useEffect, useRef, useState } from "react";

import { interactiveOverlayId } from "@constants";

import { PrimaryButton } from "../../PrimaryButton";
import {
	TableCellPropertiesIcon,
	TableColumnPropertiesIcon,
	TableMergeCellsIcon,
	TablePropertiesIcon,
	TableRemoveIcon,
	TableRowPropertiesIcon,
} from "../../SVGs";

import { CellProperties, type UpdateCellPropsFn } from "./CellProperties";
import { type TableButtonsGroup, TableCellDropdown } from "./TableCellDropdown";
import { TableProperties, type UpdateTablePropsFn } from "./TableProperties";

import type {
	DropdownIconState,
	OnTableActionButtonClickProps,
	TableButtonsList,
	TableLayoutViewOptionsValue,
	TableSettingsOverlayProps,
} from "./TableSettingsOverlay-types";

const tableProperties = "table-properties";

const tableCellProperties = "table-cell-properties";

export const tableLayoutViewOptions = {
	tableIcons: "table-icons",
	tableProperties,
	tableCellProperties,
} as const;

export const tableActiveView = {
	tableProperties,
	tableCellProperties,
	colButtons: "col-buttons",
	rowButtons: "row-buttons",
	cellSpanModifier: "cell-span-modifier",
} as const;

export const TableSettingsOverlay = ({
	tableSettingsOverlayManager,
}: TableSettingsOverlayProps) => {
	const [layoutView, setLayoutView] = useState(
		tableSettingsOverlayManager.layoutView,
	);

	const [tableProps, setTableProps] = useState(
		tableSettingsOverlayManager.tableProps,
	);

	const [cellProps, setCellProps] = useState(
		tableSettingsOverlayManager.cellProps,
	);

	const [columnButtons, setColumnButtons] = useState(
		tableSettingsOverlayManager.columnButtons,
	);

	const [rowButtons, setRowButtons] = useState(
		tableSettingsOverlayManager.rowButtons,
	);

	const [cellSpanModifier, setCellSpanModifier] = useState(
		tableSettingsOverlayManager.cellSpanModifier,
	);

	const [dropdownIconState, setDropdownIconState] =
		useState<DropdownIconState>(null);

	const columnDropdownRef = useRef<HTMLDivElement>(null);
	const rowDropdownRef = useRef<HTMLDivElement>(null);
	const cellSpanModifierDropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		tableSettingsOverlayManager.updateLayoutViewState = (layoutView) => {
			setLayoutView(layoutView);
		};

		tableSettingsOverlayManager.updateTablePropsState = (tableProps) => {
			setTableProps(tableProps);
		};

		tableSettingsOverlayManager.updateCellPropsState = (cellProps) => {
			setCellProps(cellProps);
		};

		tableSettingsOverlayManager.updateColumnButtonsState = (columnButtons) => {
			setColumnButtons(columnButtons);
		};

		tableSettingsOverlayManager.updateRowButtonsState = (rowButtons) => {
			setRowButtons(rowButtons);
		};

		tableSettingsOverlayManager.updateCellSpanModifierState = (
			cellSpanModifier,
		) => {
			setCellSpanModifier(cellSpanModifier);
		};
	}, [tableSettingsOverlayManager]);

	useEffect(() => {
		const columnDropdown = columnDropdownRef.current;
		const rowDropdown = rowDropdownRef.current;
		const cellSpanModifierDropdown = cellSpanModifierDropdownRef.current;

		if (!(columnDropdown && rowDropdown && cellSpanModifierDropdown)) {
			return;
		}

		const { onActiveViewChange } = tableSettingsOverlayManager;

		const beforeToggleIconState = (event: ToggleEvent) => {
			const { currentTarget, newState } = event;

			if (newState !== "open") {
				return;
			}

			if (currentTarget === columnDropdown) {
				onActiveViewChange?.({ activeView: tableActiveView.colButtons });
			}

			if (currentTarget === rowDropdown) {
				onActiveViewChange?.({ activeView: tableActiveView.rowButtons });
			}

			if (currentTarget === cellSpanModifierDropdown) {
				onActiveViewChange?.({ activeView: tableActiveView.cellSpanModifier });
			}
		};

		const toggleIconState = (event: ToggleEvent) => {
			const { currentTarget, newState } = event;

			if (newState === "closed") {
				setDropdownIconState(null);
				return;
			}

			if (currentTarget === columnDropdown) {
				setDropdownIconState("col");
			}

			if (currentTarget === rowDropdown) {
				setDropdownIconState("row");
			}

			if (currentTarget === cellSpanModifierDropdown) {
				setDropdownIconState("cell-modifier");
			}
		};

		const abortCtrl = new AbortController();

		const dropdowns = [columnDropdown, rowDropdown, cellSpanModifierDropdown];

		for (const dropdown of dropdowns) {
			// @ts-ignore toggle event has a ToggleEvent interface, ts implemented wrongly
			dropdown.addEventListener("beforetoggle", beforeToggleIconState, {
				signal: abortCtrl.signal,
			});

			// @ts-ignore toggle event has a ToggleEvent interface, ts implemented wrongly
			dropdown.addEventListener("toggle", toggleIconState, {
				signal: abortCtrl.signal,
			});
		}

		return () => {
			abortCtrl.abort();
		};
	}, [tableSettingsOverlayManager]);

	const updateLayoutView = (layoutView: TableLayoutViewOptionsValue) => {
		tableSettingsOverlayManager.updateState({ layoutView });

		if (
			layoutView === tableActiveView.tableProperties ||
			layoutView === tableActiveView.tableCellProperties
		) {
			tableSettingsOverlayManager.onActiveViewChange?.({
				activeView: layoutView,
			});
		}
	};

	const iconSize = 1.2;

	const onTableActionButtonClick = ({
		dropdownRef,
		type,
	}: OnTableActionButtonClickProps) => {
		const dropdown = dropdownRef.current;

		if (!dropdown) {
			throw new Error("Dropdown can't be null.");
		}

		dropdown.hidePopover();

		tableSettingsOverlayManager.onTableCellAction?.({ type });
	};

	const columnButtonsGroup: TableButtonsGroup = [
		[
			{
				name: "Insert column left",
				disabled: columnButtons.insertColumnLeft.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: columnDropdownRef,
						type: "insert-col-left",
					}),
			},
			{
				name: "Insert column right",
				disabled: columnButtons.insertColumnRight.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: columnDropdownRef,
						type: "insert-col-right",
					}),
			},
			{
				name: "Delete column",
				disabled: columnButtons.deleteColumn.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: columnDropdownRef,
						type: "delete-col",
					}),
			},
		],
	];

	const rowButtonsGroup: TableButtonsGroup = [
		[
			{
				name: "Insert row above",
				disabled: rowButtons.insertRowAbove.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: rowDropdownRef,
						type: "insert-row-above",
					}),
			},
			{
				name: "Insert row below",
				disabled: rowButtons.insertRowBelow.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: rowDropdownRef,
						type: "insert-row-below",
					}),
			},
			{
				name: "Delete row",
				disabled: rowButtons.deleteRow.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: rowDropdownRef,
						type: "delete-row",
					}),
			},
		],
	];

	const cellSpanModifierButtonsGroup: TableButtonsGroup = [
		[
			{
				name: "Merge selected cells",
				disabled: cellSpanModifier.mergeSelectedCells.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: cellSpanModifierDropdownRef,
						type: "merge-selected-cells",
					}),
			},
			{
				name: "Merge cell up",
				disabled: cellSpanModifier.mergeCellUp.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: cellSpanModifierDropdownRef,
						type: "merge-cell-up",
					}),
			},
			{
				name: "Merge cell down",
				disabled: cellSpanModifier.mergeCellDown.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: cellSpanModifierDropdownRef,
						type: "merge-cell-down",
					}),
			},
			{
				name: "Merge cell left",
				disabled: cellSpanModifier.mergeCellLeft.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: cellSpanModifierDropdownRef,
						type: "merge-cell-left",
					}),
			},
			{
				name: "Merge cell right",
				disabled: cellSpanModifier.mergeCellRight.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: cellSpanModifierDropdownRef,
						type: "merge-cell-right",
					}),
			},
		],
		[
			{
				name: "Split cell horizontally",
				disabled: cellSpanModifier.splitCellHorizontally.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: cellSpanModifierDropdownRef,
						type: "split-cell-horizontally",
					}),
			},
			{
				name: "Split cell vertically",
				disabled: cellSpanModifier.splitCellVertically.disabled,
				onClick: () =>
					onTableActionButtonClick({
						dropdownRef: cellSpanModifierDropdownRef,
						type: "split-cell-vertically",
					}),
			},
		],
	];

	const tableButtonsList: TableButtonsList = [
		{
			children: <TablePropertiesIcon size={iconSize} />,
			onClick: () => updateLayoutView(tableLayoutViewOptions.tableProperties),
		},
		{
			children: <TableCellPropertiesIcon size={iconSize} />,
			onClick: () =>
				updateLayoutView(tableLayoutViewOptions.tableCellProperties),
		},
		{
			checked: dropdownIconState === "col",
			children: <TableColumnPropertiesIcon size={iconSize} />,
			isChevron: true,
			dropdownRef: columnDropdownRef,
			popover: (
				<TableCellDropdown
					popoverTargetElementRef={columnDropdownRef}
					buttonsGroup={columnButtonsGroup}
				/>
			),
		},
		{
			checked: dropdownIconState === "row",
			children: <TableRowPropertiesIcon size={iconSize} />,
			isChevron: true,
			dropdownRef: rowDropdownRef,
			popover: (
				<TableCellDropdown
					popoverTargetElementRef={rowDropdownRef}
					buttonsGroup={rowButtonsGroup}
				/>
			),
		},
		{
			checked: dropdownIconState === "cell-modifier",
			children: <TableMergeCellsIcon size={iconSize} />,
			isChevron: true,
			dropdownRef: cellSpanModifierDropdownRef,
			popover: (
				<TableCellDropdown
					popoverTargetElementRef={cellSpanModifierDropdownRef}
					buttonsGroup={cellSpanModifierButtonsGroup}
				/>
			),
		},
		{
			children: <TableRemoveIcon size={iconSize} />,
			onClick: tableSettingsOverlayManager.onTableRemove ?? undefined,
		},
	];

	const updateTableProps: UpdateTablePropsFn = (tableProps) => {
		tableSettingsOverlayManager.updateState({
			tableProps: { ...tableSettingsOverlayManager.tableProps, ...tableProps },
		});
	};

	const updateCellProps: UpdateCellPropsFn = (cellProps) => {
		tableSettingsOverlayManager.updateState({
			cellProps: { ...tableSettingsOverlayManager.cellProps, ...cellProps },
		});
	};

	const shouldDisplayTableIcons =
		layoutView === tableLayoutViewOptions.tableIcons;

	const display = shouldDisplayTableIcons ? "" : "none";

	const shouldDisplayTableProperties =
		layoutView === tableLayoutViewOptions.tableProperties;

	const shouldDisplayCellProperties =
		layoutView === tableLayoutViewOptions.tableCellProperties;

	return (
		<div
			id={interactiveOverlayId.tableSettings}
			className="bg-white"
			popover="manual"
		>
			<div className="flex gap-1 p-1" style={{ display }}>
				{tableButtonsList.map(
					(
						{ checked, children, isChevron, dropdownRef, popover, onClick },
						index,
					) => (
						<span key={index}>
							<PrimaryButton
								checked={checked}
								isChevron={isChevron}
								popoverTargetElementRef={dropdownRef}
								className="rounded-sm p-1.5 text-slate-700"
								onClick={onClick}
							>
								{children}
							</PrimaryButton>
							{popover}
						</span>
					),
				)}
			</div>
			<TableProperties
				shouldDisplay={shouldDisplayTableProperties}
				onClose={() => updateLayoutView(tableLayoutViewOptions.tableIcons)}
				tableProps={tableProps}
				updateTableProps={updateTableProps}
				tableSettingsOverlayManager={tableSettingsOverlayManager}
			/>
			<CellProperties
				shouldDisplay={shouldDisplayCellProperties}
				onClose={() => updateLayoutView(tableLayoutViewOptions.tableIcons)}
				cellProps={cellProps}
				updateCellProps={updateCellProps}
				tableSettingsOverlayManager={tableSettingsOverlayManager}
			/>
		</div>
	);
};
