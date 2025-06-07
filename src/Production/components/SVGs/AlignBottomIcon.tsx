import type { SVGImplementation } from "./Utilities";

export interface AlignBottomIconsProps extends SVGImplementation {}

export const AlignBottomIcon = ({
	size = 1,
	className,
}: AlignBottomIconsProps) => {
	return (
		<svg
			width={size * 21}
			height={size * 16}
			viewBox="0 0 21 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>Align Bottom</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.4286 1.14286C11.4286 0.51168 10.9169 0 10.2857 0C9.65451 0 9.14286 0.51168 9.14286 1.14286V7.52663L7.66527 6.04903C7.21895 5.60271 6.49534 5.60271 6.04902 6.04903C5.60271 6.49531 5.60271 7.21897 6.04902 7.66526L9.4776 11.0938C9.92389 11.5401 10.6475 11.5401 11.0938 11.0938L14.5224 7.66526C14.9687 7.21897 14.9687 6.49531 14.5224 6.04903C14.0761 5.60271 13.3525 5.60271 12.9062 6.04903L11.4286 7.52663V1.14286ZM1.14286 13.7143C0.51168 13.7143 0 14.2259 0 14.8571C0 15.4883 0.51168 16 1.14286 16H19.4286C20.0598 16 20.5714 15.4883 20.5714 14.8571C20.5714 14.2259 20.0598 13.7143 19.4286 13.7143H1.14286Z"
				fill="currentColor"
			/>
		</svg>
	);
};
