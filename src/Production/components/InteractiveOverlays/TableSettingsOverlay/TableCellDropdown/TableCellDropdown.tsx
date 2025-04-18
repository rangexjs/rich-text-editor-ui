import { Fragment } from "react";

import type { TableCellDropdownProps } from "./TableCellDropdown-types";

export const TableCellDropdown = ({
	popoverTargetElementRef,
	buttonsGroup,
}: TableCellDropdownProps) => {
	return (
		<div
			ref={popoverTargetElementRef}
			className="mt-2 rounded-md border border-slate-200 bg-white p-1 shadow-md"
			popover="auto"
			style={{
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
								className="rounded-xs p-2 text-left transition-colors hover:bg-slate-50 disabled:text-gray-400 disabled:hover:bg-transparent"
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
