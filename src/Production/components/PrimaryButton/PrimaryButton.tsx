import { useEffect, useRef, useState } from "react";
import { ChevronIcon } from "../SVGs";

import type { PrimaryButtonProps } from "./PrimaryButton-types";

export const PrimaryButton = ({
	children,
	checked = false,
	disabled = false,
	isChevron = false,
	anchorName,
	popoverTargetElementRef,
	className,
	onClick,
}: PrimaryButtonProps) => {
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
			className={`primary-button ${className ?? ""}`}
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
