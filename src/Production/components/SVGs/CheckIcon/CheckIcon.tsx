import type { CheckIconProps } from "./CheckIcon-types";

export const CheckIcon = ({ size = 1 }: CheckIconProps) => {
	return (
		<svg
			width={size * 16}
			height={size * 12}
			viewBox="0 0 16 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Check</title>
			<path
				d="M1 6.34721L5.3077 10.625L15 1"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
