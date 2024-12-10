import { createRoot } from "react-dom/client";

// @ts-ignore
import inlineCss from "./global.css?inline";

import { EditorToolbar } from "./components";

import type {
	CreateRichTextEditorProps,
	CreateRichTextEditorReturn,
} from "./Production-types";

export const createRichTextEditor = ({
	domNode,
	richTextArea,
}: CreateRichTextEditorProps): CreateRichTextEditorReturn => {
	const shadowRoot = domNode.attachShadow({ mode: "closed" });

	const styleSheet = new CSSStyleSheet();

	styleSheet.replaceSync(inlineCss);

	shadowRoot.adoptedStyleSheets.push(styleSheet);

	const root = createRoot(shadowRoot);

	root.render(<EditorToolbar richTextArea={richTextArea} />);

	return () => root.unmount();
};
