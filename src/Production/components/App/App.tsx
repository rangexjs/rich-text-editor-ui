import { useEffect, useRef, useSyncExternalStore } from "react";

import { EditorToolbar, type EditorToolbarRows } from "../EditorToolbar";

import { createToolbarButtonProps } from "./CreateToolbarButtonProps";

import type { AppProps } from "./App-types";

export const App = ({
	editorToolbar,
	toolbarStateManager: toolbarButtonsStateManager,
	formattableButtonsStore,
	insertionButtonsStore,
	navigationButtonsStore,
	richTextArea,
}: AppProps) => {
	const richTextEditorRef = useRef<HTMLDivElement>(null);

	const formattableButtons = useSyncExternalStore(
		formattableButtonsStore.subscribe.bind(formattableButtonsStore),
		formattableButtonsStore.getSnapshot.bind(formattableButtonsStore),
	);

	const insertionButtons = useSyncExternalStore(
		insertionButtonsStore.subscribe.bind(insertionButtonsStore),
		insertionButtonsStore.getSnapshot.bind(insertionButtonsStore),
	);

	const navigationButtons = useSyncExternalStore(
		navigationButtonsStore.subscribe.bind(navigationButtonsStore),
		navigationButtonsStore.getSnapshot.bind(navigationButtonsStore),
	);

	useEffect(() => {
		if (!richTextEditorRef.current) {
			return;
		}

		richTextEditorRef.current.append(richTextArea);
	});

	const toolbarRows: EditorToolbarRows = editorToolbar.map((toolbarRow) =>
		toolbarRow.map((group) =>
			group.map((buttonName) =>
				createToolbarButtonProps({
					buttonName,
					toolbarButtonsStateManager,
					formattableButtons,
					insertionButtons,
					navigationButtons,
				}),
			),
		),
	);

	return (
		<div
			ref={richTextEditorRef}
			className="rounded border border-slate-300 border-solid"
		>
			<EditorToolbar toolbarRows={toolbarRows} />
		</div>
	);
};
