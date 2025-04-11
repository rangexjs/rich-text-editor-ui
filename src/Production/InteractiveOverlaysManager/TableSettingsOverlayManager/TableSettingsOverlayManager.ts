import type {
	CellProps,
	CellSpanModifier,
	ColumnButtons,
	OnCellPropertiesActionFn,
	OnTablePropertiesActionFn,
	RowButtons,
	TableLayoutViewOptionsValue,
	TableProps,
} from "@components";

import type {
	OnTableActiveViewChangeFn,
	OnTableCellActionFn,
	OnTableRemove,
	UpdateCellPropsStateFn,
	UpdateCellSpanModifierStateFn,
	UpdateColumnButtonsStateFn,
	UpdateRowButtonsStateFn,
	UpdateTablePropsStateFn,
	UpdateTableSettingsLayoutViewStateFn,
	UpdateTableSettingsOverlayStateProps,
} from "./TableSettingsOverlayManager-types";

export class TableSettingsOverlayManager {
	#layoutView: TableLayoutViewOptionsValue = "table-icons";
	#tableProps: TableProps = {
		width: "0px",
		height: "0px",
		alignment: "left",
		borderStyle: "solid",
		borderColor: "#00000000",
		borderWidth: "0px",
	};
	#cellProps: CellProps = {
		borderStyle: "solid",
		borderColor: "#00000000",
		borderWidth: "0px",
		backgroundColor: "#00000000",
		alignContent: "start",
	};
	#columnButtons: ColumnButtons = {
		insertColumnLeft: { disabled: false },
		insertColumnRight: { disabled: false },
		deleteColumn: { disabled: false },
	};
	#rowButtons: RowButtons = {
		insertRowAbove: { disabled: false },
		insertRowBelow: { disabled: false },
		deleteRow: { disabled: false },
	};
	#cellSpanModifier: CellSpanModifier = {
		mergeSelectedCells: { disabled: false },
		mergeCellUp: { disabled: false },
		mergeCellDown: { disabled: false },
		mergeCellRight: { disabled: false },
		mergeCellLeft: { disabled: false },
		splitCellHorizontally: { disabled: false },
		splitCellVertically: { disabled: false },
	};

	get layoutView() {
		return this.#layoutView;
	}

	get tableProps() {
		return this.#tableProps;
	}

	get cellProps() {
		return this.#cellProps;
	}

	get columnButtons() {
		return this.#columnButtons;
	}

	get rowButtons() {
		return this.#rowButtons;
	}

	get cellSpanModifier() {
		return this.#cellSpanModifier;
	}

	updateLayoutViewState: UpdateTableSettingsLayoutViewStateFn | null = null;
	updateTablePropsState: UpdateTablePropsStateFn | null = null;
	updateCellPropsState: UpdateCellPropsStateFn | null = null;
	updateColumnButtonsState: UpdateColumnButtonsStateFn | null = null;
	updateRowButtonsState: UpdateRowButtonsStateFn | null = null;
	updateCellSpanModifierState: UpdateCellSpanModifierStateFn | null = null;

	onActiveViewChange: OnTableActiveViewChangeFn | null = null;
	onTablePropertiesAction: OnTablePropertiesActionFn | null = null;
	onCellPropertiesAction: OnCellPropertiesActionFn | null = null;
	onTableCellAction: OnTableCellActionFn | null = null;
	onTableRemove: OnTableRemove | null = null;

	updateState({
		layoutView,
		tableProps,
		cellProps,
		columnButtons,
		rowButtons,
		cellSpanModifier,
	}: UpdateTableSettingsOverlayStateProps) {
		if (layoutView) {
			this.#layoutView = layoutView;
			this.updateLayoutViewState?.(layoutView);
		}

		if (tableProps) {
			this.#tableProps = tableProps;
			this.updateTablePropsState?.(tableProps);
		}

		if (cellProps) {
			this.#cellProps = cellProps;
			this.updateCellPropsState?.(cellProps);
		}

		if (columnButtons) {
			this.#columnButtons = columnButtons;
			this.updateColumnButtonsState?.(columnButtons);
		}

		if (rowButtons) {
			this.#rowButtons = rowButtons;
			this.updateRowButtonsState?.(rowButtons);
		}

		if (cellSpanModifier) {
			this.#cellSpanModifier = cellSpanModifier;
			this.updateCellSpanModifierState?.(cellSpanModifier);
		}
	}
}
