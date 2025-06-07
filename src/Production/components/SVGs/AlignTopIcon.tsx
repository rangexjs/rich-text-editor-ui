import type { SVGImplementation } from "./Utilities";

export interface AlignTopIconProps extends SVGImplementation {}

export const AlignTopIcon = ({ size = 1, className }: AlignTopIconProps) => {
	return (
		<svg
			width={size * 21}
			height={size * 16}
			viewBox="0 0 21 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>Align Top</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1.14286 0C0.51168 0 0 0.51168 0 1.14286C0 1.77403 0.51168 2.28571 1.14286 2.28571H19.4286C20.0598 2.28571 20.5714 1.77403 20.5714 1.14286C20.5714 0.51168 20.0598 0 19.4286 0H1.14286ZM11.0938 4.90616C10.6475 4.45985 9.92389 4.45985 9.4776 4.90616L6.04902 8.33474C5.60271 8.78103 5.60271 9.50469 6.04902 9.95097C6.49534 10.3973 7.21895 10.3973 7.66527 9.95097L9.14286 8.47337V14.8571C9.14286 15.4883 9.65451 16 10.2857 16C10.9169 16 11.4286 15.4883 11.4286 14.8571V8.47337L12.9062 9.95097C13.3525 10.3973 14.0761 10.3973 14.5224 9.95097C14.9687 9.50469 14.9687 8.78103 14.5224 8.33474L11.0938 4.90616Z"
				fill="currentColor"
			/>
		</svg>
	);
};
