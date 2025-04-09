import { EditorToolbar } from "../EditorToolbar";
import { RichTextAreaWrapper } from "../RichTextAreaWrapper";

import type { AppProps } from "./App-types";

export const App = ({
	toolbarButtons,
	toolbarButtonsActionManager,
	formatLineTagNameButtonsStateManager,
	formatStylesButtonsStateManager,
	historyNavigationButtonsStateManager,
	nodeInsertionButtonsStateManager,
	nonCategorizedOperationButtonsStateManager,
	interactiveOverlays,
	anchorOverlayManager,
	caretListboxOverlayManager,
	tableSettingsOverlayManager,
	richTextArea,
}: AppProps) => {
	return (
		<div className="rounded-sm border border-slate-300 border-solid">
			<EditorToolbar
				toolbarRows={toolbarButtons}
				toolbarButtonsActionManager={toolbarButtonsActionManager}
				formatLineTagNameButtonsStateManager={
					formatLineTagNameButtonsStateManager
				}
				formatStylesButtonsStateManager={formatStylesButtonsStateManager}
				historyNavigationButtonsStateManager={
					historyNavigationButtonsStateManager
				}
				nodeInsertionButtonsStateManager={nodeInsertionButtonsStateManager}
				nonCategorizedOperationButtonsStateManager={
					nonCategorizedOperationButtonsStateManager
				}
			/>
			<RichTextAreaWrapper
				interactiveOverlays={interactiveOverlays}
				anchorOverlayManager={anchorOverlayManager}
				caretListboxOverlayManager={caretListboxOverlayManager}
				tableSettingsOverlayManager={tableSettingsOverlayManager}
				richTextArea={richTextArea}
			/>
		</div>
	);
};
