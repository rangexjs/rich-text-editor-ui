import { createRichTextEditor } from "src/Product";

import { createRoot } from "react-dom/client";
import type { SimulateProductEnvironmentProps } from "./Development-types";
import { DevelopmentView } from "./components";

export const simulateProductEnvironment = ({
	domNode,
}: SimulateProductEnvironmentProps) => {
	const root = createRoot(domNode);

	const innerRoot = document.createElement("div");

	root.render(<DevelopmentView innerRoot={innerRoot} />);

	const richTextArea = document.createElement("div");

	richTextArea.textContent = "Text of the Rich Text Area.";

	return createRichTextEditor({ domNode: innerRoot, richTextArea });
};
