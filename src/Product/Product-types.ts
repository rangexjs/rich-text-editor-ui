import type { EditorToolbarProps } from "./components";

export interface CreateRichTextEditorProps extends EditorToolbarProps {
	domNode: DocumentFragment | Element;
}

export type CreateRichTextEditorReturn = () => void;
