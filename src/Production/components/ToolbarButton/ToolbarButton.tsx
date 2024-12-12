import { useEffect, useRef } from "react";
import { ChevronSVG } from "../SVGs";

import type { ToolbarButtonProps } from "./ToolbarButton-types";

export const ToolbarButton = ({
	children,
	anchorName,
	isChevron,
	isChecked,
	isDisabled,
	onClick,
}: ToolbarButtonProps) => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!buttonRef.current) {
			return;
		}

		buttonRef.current.setAttribute("data-is-transition", "true");
	}, []);

	return (
		<button
			ref={buttonRef}
			onClick={onClick}
			type="button"
			data-is-checked={isChecked}
			data-is-disabled={isDisabled}
			className="toolbar-button"
			// @ts-ignore
			style={{ anchorName }}
		>
			<span className="inline-flex items-center">{children}</span>
			{isChevron && <ChevronSVG />}
		</button>
	);
};
