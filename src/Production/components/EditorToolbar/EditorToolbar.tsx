import { useEffect, useRef } from "react";
import type { EditorToolbarProps } from "./EditorToolbar-types";

export const EditorToolbar = ({ richTextArea }: EditorToolbarProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		ref.current.append(richTextArea);
	}, [richTextArea]);

	return (
		<div className="border border-gray-600" ref={ref}>
			Editor Toolbar.
		</div>
	);
};
