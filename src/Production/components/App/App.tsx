import { useEffect, useRef, useSyncExternalStore } from "react";

import { EditorToolbar } from "../EditorToolbar";

import type { AppProps } from "./App-types";

export const App = ({
	toolbarButtons,
	toolbarButtonsActionManager,
	formatLineTagNameButtonsStore,
	formatStylesButtonsStore,
	historyNavigationButtonsStore,
	nodeInsertionButtonsStore,
	nonCategorizedOperationButtonsStore,
	richTextArea,
}: AppProps) => {
	const richTextEditorRef = useRef<HTMLDivElement>(null);

	const formatLineTagNameButtonsState = useSyncExternalStore(
		formatLineTagNameButtonsStore.subscribe.bind(formatLineTagNameButtonsStore),
		formatLineTagNameButtonsStore.getSnapshot.bind(
			formatLineTagNameButtonsStore,
		),
	);

	const formatStylesButtonsState = useSyncExternalStore(
		formatStylesButtonsStore.subscribe.bind(formatStylesButtonsStore),
		formatStylesButtonsStore.getSnapshot.bind(formatStylesButtonsStore),
	);

	const historyNavigationButtonsState = useSyncExternalStore(
		historyNavigationButtonsStore.subscribe.bind(historyNavigationButtonsStore),
		historyNavigationButtonsStore.getSnapshot.bind(
			historyNavigationButtonsStore,
		),
	);

	const nodeInsertionButtonsState = useSyncExternalStore(
		nodeInsertionButtonsStore.subscribe.bind(nodeInsertionButtonsStore),
		nodeInsertionButtonsStore.getSnapshot.bind(nodeInsertionButtonsStore),
	);

	const nonCategorizedOperationButtonsState = useSyncExternalStore(
		nonCategorizedOperationButtonsStore.subscribe.bind(
			nonCategorizedOperationButtonsStore,
		),
		nonCategorizedOperationButtonsStore.getSnapshot.bind(
			nonCategorizedOperationButtonsStore,
		),
	);

	useEffect(() => {
		if (!richTextEditorRef.current) {
			return;
		}

		richTextEditorRef.current.append(richTextArea);

		return () => {
			richTextArea.remove();
		};
	}, [richTextArea]);

	return (
		<div
			ref={richTextEditorRef}
			className="rounded border border-slate-300 border-solid"
		>
			<EditorToolbar
				toolbarRows={toolbarButtons}
				toolbarButtonsActionManager={toolbarButtonsActionManager}
				formatLineTagNameButtonsState={formatLineTagNameButtonsState}
				formatStylesButtonsState={formatStylesButtonsState}
				historyNavigationButtonsState={historyNavigationButtonsState}
				nodeInsertionButtonsState={nodeInsertionButtonsState}
				nonCategorizedOperationButtonsState={
					nonCategorizedOperationButtonsState
				}
			/>
		</div>
	);
};
