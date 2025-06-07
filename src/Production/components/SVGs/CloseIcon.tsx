import type { SVGImplementation } from "./Utilities";

export interface CloseIconProps extends SVGImplementation {}

export const CloseIcon = ({ size = 1 }: CloseIconProps) => {
	return (
		<svg
			width={size * 16}
			height={size * 16}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Close</title>
			<path
				d="M14.9999 14.9999L7.99996 7.99996M7.99996 7.99996L1 1M7.99996 7.99996L15 1M7.99996 7.99996L1 15"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
