import { Fragment } from "react";

import type { TableCellDropdownProps } from "./TableCellDropdown-types";

export const TableCellDropdown = ({
	anchorName,
	popoverTargetElementRef,
	buttonsGroup,
}: TableCellDropdownProps) => {
	return (
		<div
			ref={popoverTargetElementRef}
			className="absolute mt-2 rounded-md border border-slate-200 bg-white p-1 shadow-md"
			popover="auto"
			style={{
				// @ts-ignore
				anchorName,
				top: "anchor(bottom)",
				justifySelf: "anchor-center",
			}}
		>
			{buttonsGroup.map((buttons, index) => (
				<Fragment key={index}>
					<div className="flex flex-col text-sm">
						{buttons.map(({ name, disabled, onClick }) => (
							<button
								key={name}
								type="button"
								className="rounded-sm p-2 text-left transition-colors hover:bg-slate-50 disabled:text-gray-400 disabled:hover:bg-transparent"
								disabled={disabled}
								onClick={onClick}
							>
								{name}
							</button>
						))}
					</div>
					{buttonsGroup.length - 1 > index && <hr className="my-1" />}
				</Fragment>
			))}
		</div>
	);
};
