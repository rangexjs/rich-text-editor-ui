import type { TableSettingsOverlayStore } from "@externalStores";

import type { ToolbarButtonProps } from "../../PrimaryButton";

interface TableIconButton extends ToolbarButtonProps {}

export type TableButtonsList = TableIconButton[];

export interface TableSettingsOverlayProps {
	tableSettingsOverlayStore: TableSettingsOverlayStore;
}
