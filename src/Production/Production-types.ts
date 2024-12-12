import type { EditorToolbarProps } from "./components";

export interface CreateRichTextEditorProps extends EditorToolbarProps {
	domNode: Element;
}

export type CreateRichTextEditorReturn = () => void;
