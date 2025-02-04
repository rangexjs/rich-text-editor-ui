import type { interactiveOverlayName } from "@constants";
import type {
	AnchorOverlayState,
	TableSettingsOverlayState,
} from "@externalStores";

type InteractiveOverlayName = typeof interactiveOverlayName;

type InteractiveOverlayNameKey =
	InteractiveOverlayName[keyof InteractiveOverlayName];

type OverlayElement = HTMLDivElement;

export type ExistingOverlays = Map<InteractiveOverlayNameKey, OverlayElement>;

export type GetOverlayElementProps = InteractiveOverlayNameKey;

export type GetOverlayElementReturn = OverlayElement | undefined;

export type CreateRootElementReturn = OverlayElement;

export type CreateAnchorElementReturn = HTMLDivElement;

export interface UpdateAnchorStateProps extends Partial<AnchorOverlayState> {}

export type CreateTableSettingsElementReturn = HTMLDivElement;

export interface UpdateTableSettingsStateProps
	extends Partial<TableSettingsOverlayState> {}

export interface InteractiveOverlayReturn {
	getOverlayElement: (props: GetOverlayElementProps) => GetOverlayElementReturn;
	createAnchorElement: () => CreateAnchorElementReturn;
	updateAnchorState: (props: UpdateAnchorStateProps) => void;
	createTableSettingsElement: () => CreateTableSettingsElementReturn;
	updateTableSettingsState: (props: UpdateTableSettingsStateProps) => void;
}
