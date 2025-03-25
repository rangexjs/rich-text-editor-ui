import type {
	OnFormatLineTagNameFn,
	OnFormatStylesChangeFn,
	OnHistoryNavigationFn,
	OnNodeInsertionFn,
	OnNonCategorizedOperationFn,
} from "./ToolbarButtonsActionManager-types";

export class ToolbarButtonsActionManager {
	onFormatLineTagName: OnFormatLineTagNameFn | null = null;
	onFormatStyles: OnFormatStylesChangeFn | null = null;
	onHistoryNavigation: OnHistoryNavigationFn | null = null;
	onNodeInsertion: OnNodeInsertionFn | null = null;
	onNonCategorizedOperation: OnNonCategorizedOperationFn | null = null;
}
