import type {
	TableCellActionType,
	TableSettingsOverlayStore,
} from "@externalStores";
import type { ReactNode, RefObject } from "react";

import type { PrimaryButtonProps } from "../../PrimaryButton";

export type DropdownIconState = "col" | "row" | "cell-modifier" | null;

export interface OnTableActionButtonClickProps {
	dropdownRef: RefObject<HTMLDivElement | null>;
	type: TableCellActionType;
}

interface TableIconButton extends PrimaryButtonProps {
	dropdownRef?: RefObject<HTMLDivElement | null>;
	popover?: ReactNode;
}

export type TableButtonsList = TableIconButton[];

export interface TableSettingsOverlayProps {
	tableSettingsOverlayStore: TableSettingsOverlayStore;
}
