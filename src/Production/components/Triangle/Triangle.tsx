import type { TriangleProps } from "./Triangle-types";

export const Triangle = ({
	width,
	height,
	ref,
	className,
	style,
}: TriangleProps) => {
	const path = `M ${width / 2} 0 L ${width} ${height} L 0 ${height} Z`;

	return (
		<span
			ref={ref}
			className={`inline-block ${className}`}
			style={{
				...style,
				width,
				height,
				clipPath: `path("${path}")`,
			}}
		/>
	);
};
