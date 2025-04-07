import type { ToolbarDropdownProps } from "./ToolbarDropdown-types";

export const ToolbarDropdown = ({
	ref,
	className,
	children,
	position = "center",
}: ToolbarDropdownProps) => {
	const horizontalPosition = {
		left: { left: "anchor(left)" },
		center: { justifySelf: "anchor-center" },
		right: { right: "anchor(right)" },
	}[position];

	return (
		<div
			ref={ref}
			popover="auto"
			className={`mt-1 rounded-md border border-slate-200 bg-white shadow-md ${className}`}
			style={{
				top: "anchor(bottom)",
				...horizontalPosition,
			}}
		>
			{children}
		</div>
	);
};
