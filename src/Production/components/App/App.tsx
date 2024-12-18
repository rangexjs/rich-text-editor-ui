import { useEffect, useRef, useSyncExternalStore } from "react";

import { EditorToolbar } from "../EditorToolbar";

import type { AppProps } from "./App-types";

export const App = ({
	toolbarButtons,
	toolbarButtonsActionManager,
	formattableButtonsStore,
	insertionButtonsStore,
	navigationButtonsStore,
	richTextArea,
}: AppProps) => {
	const richTextEditorRef = useRef<HTMLDivElement>(null);

	const formattableButtonsState = useSyncExternalStore(
		formattableButtonsStore.subscribe.bind(formattableButtonsStore),
		formattableButtonsStore.getSnapshot.bind(formattableButtonsStore),
	);

	const insertionButtonsState = useSyncExternalStore(
		insertionButtonsStore.subscribe.bind(insertionButtonsStore),
		insertionButtonsStore.getSnapshot.bind(insertionButtonsStore),
	);

	const navigationButtonsState = useSyncExternalStore(
		navigationButtonsStore.subscribe.bind(navigationButtonsStore),
		navigationButtonsStore.getSnapshot.bind(navigationButtonsStore),
	);

	useEffect(() => {
		if (!richTextEditorRef.current) {
			return;
		}

		richTextEditorRef.current.append(richTextArea);
	});

	return (
		<div
			ref={richTextEditorRef}
			className="rounded border border-slate-300 border-solid"
		>
			<EditorToolbar
				toolbarRows={toolbarButtons}
				toolbarButtonsActionManager={toolbarButtonsActionManager}
				formattableButtonsState={formattableButtonsState}
				insertionButtonsState={insertionButtonsState}
				navigationButtonsState={navigationButtonsState}
			/>
		</div>
	);
};
