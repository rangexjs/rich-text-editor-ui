import type { TableSettingsOverlayStore } from "@externalStores";

import type { PrimaryButtonProps } from "../../PrimaryButton";

interface TableIconButton extends PrimaryButtonProps {}

export type TableButtonsList = TableIconButton[];

export interface TableSettingsOverlayProps {
	tableSettingsOverlayStore: TableSettingsOverlayStore;
}
