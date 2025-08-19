import type { SVGImplementation } from "./Utilities";

export interface InfoIconIconsProps extends SVGImplementation {}

export const InfoIcon = ({ size = 1, className }: InfoIconIconsProps) => {
	return (
		<svg
			width={size * 16}
			height={size * 16}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			role="img"
			aria-label="Info"
		>
			<path
				d="M8 11.4999V7.29993"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M8.00029 4.50002C8.38689 4.50002 8.70029 4.81343 8.70029 5.20002C8.70029 5.58662 8.38689 5.90002 8.00029 5.90002C7.61369 5.90002 7.30029 5.58662 7.30029 5.20002C7.30029 4.81343 7.61369 4.50002 8.00029 4.50002Z"
				fill="currentColor"
			/>
			<path
				d="M15 8C15 11.2998 15 12.9498 13.9748 13.9748C12.9498 15 11.2998 15 8 15C4.70017 15 3.05025 15 2.02513 13.9748C1 12.9498 1 11.2998 1 8C1 4.70017 1 3.05025 2.02513 2.02513C3.05025 1 4.70017 1 8 1C11.2998 1 12.9498 1 13.9748 2.02513C14.6565 2.70675 14.8849 3.66458 14.9614 5.2"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
};
