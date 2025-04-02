import { useEffect, useRef } from "react";

import { AnchorOverlay, TableSettingsOverlay } from "../InteractiveOverlays";

import type { RichTextAreaWrapperProps } from "./RichTextAreaWrapper-types";

export const RichTextAreaWrapper = ({
	interactiveOverlays,
	anchorOverlayStore,
	tableSettingsOverlayStore,
	richTextArea,
}: RichTextAreaWrapperProps) => {
	const richTextAreaHolderRef = useRef<HTMLDivElement>(null);

	const { anchor, tableSettings } = interactiveOverlays;

	useEffect(() => {
		if (!richTextAreaHolderRef.current) {
			return;
		}

		richTextAreaHolderRef.current.append(richTextArea);

		return () => {
			richTextArea.remove();
		};
	}, [richTextArea]);

	return (
		<div>
			<div ref={richTextAreaHolderRef} />
			<div>
				{anchor && <AnchorOverlay anchorOverlayStore={anchorOverlayStore} />}
				{tableSettings && (
					<TableSettingsOverlay
						tableSettingsOverlayStore={tableSettingsOverlayStore}
					/>
				)}
			</div>
		</div>
	);
};
