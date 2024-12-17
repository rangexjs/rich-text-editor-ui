import { useEffect, useRef, useState } from "react";
import { ChevronSVG } from "../SVGs";

import type { ToolbarButtonProps } from "./ToolbarButton-types";

export const ToolbarButton = ({
	children,
	anchorName,
	isChevron,
	checked,
	disabled,
	onClick,
}: ToolbarButtonProps) => {
	const [isChecked, setIsChecked] = useState(checked);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	useEffect(() => {
		if (!buttonRef.current) {
			return;
		}

		buttonRef.current.setAttribute("data-is-transition", "true");
	}, []);

	return (
		<button
			ref={buttonRef}
			onClick={(event) =>
				onClick({
					event,
					isChecked,
					isDisabled: disabled,
					setIsChecked,
				})
			}
			type="button"
			data-is-checked={isChecked}
			data-is-disabled={disabled}
			className="toolbar-button"
			// @ts-ignore
			style={{ anchorName }}
		>
			<span className="inline-flex items-center">{children}</span>
			{isChevron && <ChevronSVG />}
		</button>
	);
};
