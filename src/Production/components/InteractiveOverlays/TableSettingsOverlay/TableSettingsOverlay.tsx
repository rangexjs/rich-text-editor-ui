import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { interactiveOverlayId } from "@constants";
import {
	type TableLayoutViewOptionsValue,
	tableActiveView,
	tableLayoutViewOptions,
} from "@externalStores";

import { PrimaryButton } from "../../PrimaryButton";
import {
	TableCellPropertiesIcon,
	TableColumnPropertiesIcon,
	TableMergeCellsIcon,
	TablePropertiesIcon,
	TableRemoveIcon,
	TableRowPropertiesIcon,
} from "../../SVGs";

import { CellProperties, type SetCellPropsFn } from "./CellProperties";
import { type TableButtonsGroup, TableCellDropdown } from "./TableCellDropdown";
import { type SetTablePropsFn, TableProperties } from "./TableProperties";

import type {
	DropdownIconState,
	OnTableActionButtonClickProps,
	TableButtonsList,
	TableSettingsOverlayProps,
} from "./TableSettingsOverlay-types";

export const TableSettingsOverlay = ({
	tableSettingsOverlayStore,
}: TableSettingsOverlayProps) => {
	const tableSettingsOverlayState = useSyncExternalStore(
		tableSettingsOverlayStore.subscribe.bind(tableSettingsOverlayStore),
		tableSettingsOverlayStore.getSnapshot.bind(tableSettingsOverlayStore),
	);

	const columnDropdownRef = useRef<HTMLDivElement>(null);
	const rowDropdownRef = useRef<HTMLDivElement>(null);
	const cellSpanModifierDropdownRef = useRef<HTMLDivElement>(null);

	const [dropdownIconState, setDropdownIconState] =
		useState<DropdownIconState>(null);

	const {
		layoutView,
		onActiveViewChange,
		columnButtons,
		rowButtons,
		cellSpanModifier,
		onTableCellAction,
		onTableRemove,
	} = tableSettingsOverlayState;

	useEffect(() => {
		const columnDropdown = columnDropdownRef.current;
		const rowDropdown = rowDropdownRef.current;
		const cellSpanModifierDropdown = cellSpanModifierDropdownRef.current;

		if (!(columnDropdown && rowDropdown && cellSpanModifierDropdown)) {
			return;
		}

		const beforeToggleIconState = (event: ToggleEvent) => {
			const { currentTarget, newState } = event;

			if (newState !== "open") {
				return;
			}

			if (currentTarget === columnDropdown) {
				onActiveViewChange({ activeView: tableActiveView.colButtons });
			}

			if (currentTarget === rowDropdown) {
				onActiveViewChange({ activeView: tableActiveView.rowButtons });
			}

			if (currentTarget === cellSpanModifierDropdown) {
				onActiveViewChange({ activeView: tableActiveView.cellSpanModifier });
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
	}, [onActiveViewChange]);

	const updateLayoutView = (layoutView: TableLayoutViewOptionsValue) => {
		tableSettingsOverlayStore.updateState({ layoutView });

		if (
			layoutView === tableActiveView.tableProperties ||
			layoutView === tableActiveView.tableCellProperties
		) {
			onActiveViewChange({ activeView: layoutView });
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

		onTableCellAction({ type });
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
			onClick: onTableRemove,
		},
	];

	const setTableProps: SetTablePropsFn = (tableProps) => {
		tableSettingsOverlayStore.updateState({
			tableProps: { ...tableSettingsOverlayState.tableProps, ...tableProps },
		});
	};

	const setCellProps: SetCellPropsFn = (cellProps) => {
		tableSettingsOverlayStore.updateState({
			cellProps: { ...tableSettingsOverlayState.cellProps, ...cellProps },
		});
	};

	return (
		<div
			id={interactiveOverlayId.tableSettings}
			className="bg-white"
			// @ts-ignore
			popover="manual"
		>
			<div
				className="flex gap-1 p-1"
				style={{
					display:
						layoutView === tableLayoutViewOptions.tableIcons ? "" : "none",
				}}
			>
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
								className="text-slate-700"
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
				layoutView={layoutView}
				updateLayoutView={() =>
					updateLayoutView(tableLayoutViewOptions.tableIcons)
				}
				tableProps={tableSettingsOverlayState.tableProps}
				setTableProps={setTableProps}
				onTablePropertiesAction={
					tableSettingsOverlayState.onTablePropertiesAction
				}
			/>
			<CellProperties
				layoutView={layoutView}
				updateLayoutView={() =>
					updateLayoutView(tableLayoutViewOptions.tableIcons)
				}
				cellProps={tableSettingsOverlayState.cellProps}
				setCellProps={setCellProps}
				onCellPropertiesAction={
					tableSettingsOverlayState.onCellPropertiesAction
				}
			/>
		</div>
	);
};
