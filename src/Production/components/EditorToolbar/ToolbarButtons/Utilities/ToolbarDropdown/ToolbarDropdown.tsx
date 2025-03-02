import type { ToolbarDropdownProps } from "./ToolbarDropdown-types";

export const ToolbarDropdown = ({
	ref,
	positionAnchor,
	className,
	children,
}: ToolbarDropdownProps) => {
	return (
		<div
			ref={ref}
			popover="auto"
			className={`absolute mt-1 rounded-md border border-slate-200 bg-white shadow-md ${className}`}
			style={{
				// @ts-ignore
				positionAnchor,
				top: "anchor(bottom)",
				justifySelf: "anchor-center",
			}}
		>
			{children}
		</div>
	);
};
