import { useEffect, useRef, useState } from "react";
import { ChevronIcon } from "../SVGs";

import type { ToolbarButtonProps } from "./ToolbarButton-types";

export const ToolbarButton = ({
	children,
	isChevron,
	checked,
	disabled,
	anchorName,
	popoverTargetElementRef,
	className,
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
			type="button"
			data-is-checked={isChecked}
			data-is-disabled={disabled}
			className={`toolbar-button ${className ?? ""}`}
			// @ts-ignore
			style={{ anchorName }}
			onClick={(event) =>
				onClick?.({
					event,
					isChecked,
					isDisabled: disabled,
					setIsChecked,
				})
			}
		>
			<span className="inline-flex items-center">{children}</span>
			{isChevron && <ChevronIcon />}
		</button>
	);
};
