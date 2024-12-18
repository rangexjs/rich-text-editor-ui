import type {
	OnFormatStylesChangeFn,
	OnInsertionChangeFn,
	OnLineTagNameChangeFn,
	OnNavigationChangeFn,
} from "./ToolbarButtonsActionManager-types";

export class ToolbarButtonsActionManager {
	onFormatStylesChange: OnFormatStylesChangeFn | null = null;
	onInsertionChange: OnInsertionChangeFn | null = null;
	onLineTagNameChange: OnLineTagNameChangeFn | null = null;
	onNavigationChange: OnNavigationChangeFn | null = null;
}
