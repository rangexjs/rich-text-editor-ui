import type {
	OnFormatStylesChangeFn,
	OnInsertionChangeFn,
	OnNavigationChangeFn,
} from "./ToolbarButtonsActionManager-types";

export class ToolbarButtonsActionManager {
	onFormatStylesChange: OnFormatStylesChangeFn | null = null;
	onInsertionChange: OnInsertionChangeFn | null = null;
	onNavigationChange: OnNavigationChangeFn | null = null;
}
