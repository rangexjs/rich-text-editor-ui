import { useEffect, useRef } from "react";

import {
	AnchorOverlay,
	CaretListboxOverlay,
	TableSettingsOverlay,
} from "../InteractiveOverlays";

import type { RichTextAreaWrapperProps } from "./RichTextAreaWrapper-types";

export const RichTextAreaWrapper = ({
	interactiveOverlays,
	anchorOverlayManager,
	caretListboxOverlayManager,
	tableSettingsOverlayManager,
	richTextArea,
}: RichTextAreaWrapperProps) => {
	const richTextAreaHolderRef = useRef<HTMLDivElement>(null);

	const { anchor, caretListbox, tableSettings } = interactiveOverlays;

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
				{anchor && (
					<AnchorOverlay anchorOverlayManager={anchorOverlayManager} />
				)}
				{caretListbox && (
					<CaretListboxOverlay
						caretListboxOverlayManager={caretListboxOverlayManager}
					/>
				)}
				{tableSettings && (
					<TableSettingsOverlay
						tableSettingsOverlayManager={tableSettingsOverlayManager}
					/>
				)}
			</div>
		</div>
	);
};
