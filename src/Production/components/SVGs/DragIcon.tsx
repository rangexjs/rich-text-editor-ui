import type { SVGImplementation } from "./Utilities";

export interface DragIconProps extends SVGImplementation {}

export const DragIcon = ({ size = 1, className }: DragIconProps) => {
	return (
		<svg
			width={size * 10}
			height={size * 16}
			viewBox="0 0 10 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>Drag</title>
			<path
				d="M7 14C7 14.5523 7.4477 15 8 15C8.5523 15 9 14.5523 9 14C9 13.4477 8.5523 13 8 13C7.4477 13 7 13.4477 7 14Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M1 14C1 14.5523 1.44772 15 2 15C2.55228 15 3 14.5523 3 14C3 13.4477 2.55228 13 2 13C1.44772 13 1 13.4477 1 14Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7 8C7 8.5523 7.4477 9 8 9C8.5523 9 9 8.5523 9 8C9 7.4477 8.5523 7 8 7C7.4477 7 7 7.4477 7 8Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M1 8C1 8.5523 1.44772 9 2 9C2.55228 9 3 8.5523 3 8C3 7.4477 2.55228 7 2 7C1.44772 7 1 7.4477 1 8Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7 2C7 2.55228 7.4477 3 8 3C8.5523 3 9 2.55228 9 2C9 1.44772 8.5523 1 8 1C7.4477 1 7 1.44772 7 2Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M1 2C1 2.55228 1.44772 3 2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
