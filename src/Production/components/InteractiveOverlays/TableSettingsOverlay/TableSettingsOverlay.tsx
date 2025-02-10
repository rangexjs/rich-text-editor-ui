import {
	type TableLayoutViewOptionsValue,
	tableLayoutViewOptions,
} from "@externalStores";
import { useEffect, useState, useSyncExternalStore } from "react";

import { PrimaryButton } from "../../PrimaryButton";
import {
	TableCellPropertiesIcon,
	TableColumnPropertiesIcon,
	TablePropertiesIcon,
	TableRemoveIcon,
	TableRowPropertiesIcon,
} from "../../SVGs";

import { CellProperties, type SetCellPropsFn } from "./CellProperties";
import { type SetTablePropsFn, TableProperties } from "./TableProperties";

import type {
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

	const [layoutView, setLayoutView] = useState<TableLayoutViewOptionsValue>(
		tableSettingsOverlayState.layoutView,
	);

	useEffect(() => {
		setLayoutView(tableSettingsOverlayState.layoutView);
	}, [tableSettingsOverlayState]);

	const onTablePropertiesClick = () => {
		setLayoutView(tableLayoutViewOptions.tableProperties);
	};

	const onTableCellPropertiesClick = () => {
		setLayoutView(tableLayoutViewOptions.tableCellProperties);
	};

	const iconSize = 1.2;

	const tableButtonsList: TableButtonsList = [
		{
			children: <TablePropertiesIcon size={iconSize} />,
			onClick: onTablePropertiesClick,
		},
		{
			children: <TableCellPropertiesIcon size={iconSize} />,
			onClick: onTableCellPropertiesClick,
		},
		{
			children: <TableColumnPropertiesIcon size={iconSize} />,
			isChevron: true,
			// onClick: () => {},
		},
		{
			children: <TableRowPropertiesIcon size={iconSize} />,
			isChevron: true,
			// onClick: () => {},
		},
		{
			children: <TableRemoveIcon size={iconSize} />,
			// onClick: () => {},
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
		<div>
			<div
				className="flex gap-1 p-1"
				style={{
					display:
						layoutView === tableLayoutViewOptions.tableIcons ? "" : "none",
				}}
			>
				{tableButtonsList.map(({ children, isChevron, onClick }, index) => (
					<PrimaryButton key={index} isChevron={isChevron} onClick={onClick}>
						{children}
					</PrimaryButton>
				))}
			</div>
			<TableProperties
				layoutView={layoutView}
				setLayoutView={setLayoutView}
				tableProps={tableSettingsOverlayState.tableProps}
				setTableProps={setTableProps}
				onTablePropertiesAction={
					tableSettingsOverlayState.onTablePropertiesAction
				}
			/>
			<CellProperties
				layoutView={layoutView}
				setLayoutView={setLayoutView}
				cellProps={tableSettingsOverlayState.cellProps}
				setCellProps={setCellProps}
				onCellPropertiesAction={
					tableSettingsOverlayState.onCellPropertiesAction
				}
			/>
		</div>
	);
};
