import { useEffect, useRef } from "react";

import { ChevronIcon } from "../SVGs";

import type { ComboBoxProps, OnListItemClickProps } from "./ComboBox-types";

export const ComboBox = ({
	buttonChildren,
	list,
	className,
	buttonStyles,
}: ComboBoxProps) => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const button = buttonRef.current;
		const dropdown = dropdownRef.current;

		if (!(button && dropdown)) {
			return;
		}

		button.popoverTargetElement = dropdown;
	}, []);

	const comboBoxAnchor = "--combo-box-anchor";

	const onListItemClick = ({ onClick }: OnListItemClickProps) => {
		const dropdown = dropdownRef.current;

		if (!dropdown) {
			throw new Error("Dropdown can't be null.");
		}

		dropdown.hidePopover();

		onClick();
	};

	return (
		<span
			className={className}
			style={{
				// @ts-ignore
				anchorScope: comboBoxAnchor,
			}}
		>
			<button
				ref={buttonRef}
				type="button"
				className="default-btn inline-flex h-full items-center justify-between px-2"
				style={{
					...buttonStyles,
					// @ts-ignore
					anchorName: comboBoxAnchor,
				}}
			>
				{buttonChildren}
				<ChevronIcon />
			</button>
			<div
				ref={dropdownRef}
				className="absolute mt-1 flex-col rounded-md border border-slate-200 shadow-md [&:popover-open]:flex"
				popover="auto"
				style={{
					// @ts-ignore
					positionAnchor: comboBoxAnchor,
					top: "anchor(bottom)",
					left: "anchor(left)",
					width: "anchor-size(width)",
				}}
			>
				{list.map(({ id, children, onClick }) => {
					return (
						<button
							key={id}
							type="button"
							className="px-2 py-1 text-sm transition-colors hover:bg-slate-100"
							onClick={() => onListItemClick({ onClick })}
						>
							<span className="inline-block w-full text-start">{children}</span>
						</button>
					);
				})}
			</div>
		</span>
	);
};
