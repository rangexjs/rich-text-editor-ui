import { createRoot } from "react-dom/client";

import "./global.css";

import { EditorToolbar } from "./components";

import type {
	CreateRichTextEditorProps,
	CreateRichTextEditorReturn,
} from "./Product-types";

export const createRichTextEditor = ({
	domNode,
	richTextArea,
}: CreateRichTextEditorProps): CreateRichTextEditorReturn => {
	const root = createRoot(domNode);

	root.render(<EditorToolbar richTextArea={richTextArea} />);

	return () => root.unmount();
};
