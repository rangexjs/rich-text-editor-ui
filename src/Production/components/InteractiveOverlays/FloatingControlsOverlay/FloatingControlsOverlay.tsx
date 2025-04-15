import { useEffect, useState } from "react";

import { interactiveOverlayId } from "@constants";

import { CopyIcon, DragIcon } from "../../SVGs";

import type {
	ControlList,
	FloatingControlsOverlayProps,
} from "./FloatingControlsOverlay-types";

export const FloatingControlsOverlay = ({
	floatingControlsOverlayManager,
}: FloatingControlsOverlayProps) => {
	const [isCopy, setIsCopy] = useState(floatingControlsOverlayManager.copy);
	const [isDrag, setIsDrag] = useState(floatingControlsOverlayManager.drag);

	useEffect(() => {
		floatingControlsOverlayManager.updateCopyState = (copy) => {
			setIsCopy(copy);
		};

		floatingControlsOverlayManager.updateDragState = (drag) => {
			setIsDrag(drag);
		};
	}, [floatingControlsOverlayManager]);

	const controlList: ControlList = [];

	isDrag && controlList.push({ children: <DragIcon /> });

	isCopy && controlList.push({ children: <CopyIcon /> });

	return (
		<div
			id={interactiveOverlayId.floatingControls}
			popover="manual"
			className="gap-1 rounded-md border-1 border-slate-300 p-1 shadow-sm [&:popover-open]:inline-flex"
			style={{
				inset: "anchor(top) anchor(right) anchor(bottom) anchor(left)",
			}}
		>
			{controlList.map(({ children }, index) => (
				<button
					key={index}
					type="button"
					className="inline-flex w-6 items-center justify-center rounded-sm p-1 text-slate-700 transition-all hover:bg-slate-100"
				>
					{children}
				</button>
			))}
		</div>
	);
};
