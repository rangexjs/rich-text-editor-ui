import { useEffect, useRef, useState } from "react";
import { ChevronSVG } from "../SVGs";

import type { ToolbarButtonProps } from "./ToolbarButton-types";

export const ToolbarButton = ({
	children,
	isChevron,
	checked,
	disabled,
	anchorName,
	popoverTargetElementRef,
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

	useEffect(() => {
		const button = buttonRef.current;

		if (!button) {
			return;
		}

		const popoverTargetElement = popoverTargetElementRef?.current;

		if (!popoverTargetElement) {
			return;
		}

		button.popoverTargetElement = popoverTargetElement;
	}, [popoverTargetElementRef]);

	return (
		<button
			ref={buttonRef}
			onClick={(event) =>
				onClick?.({
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
