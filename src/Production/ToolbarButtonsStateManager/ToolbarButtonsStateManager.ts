import type {
	OnFormatStylesChangeFn,
	OnInsertionChangeFn,
	OnNavigationChangeFn,
} from "./ToolbarButtonsStateManager-types";

export class ToolbarButtonsStateManager {
	onFormatStylesChange: OnFormatStylesChangeFn | null = null;
	onInsertionChange: OnInsertionChangeFn | null = null;
	onNavigationChange: OnNavigationChangeFn | null = null;
}
