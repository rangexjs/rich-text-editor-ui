import type { SVGImplementation } from "./Utilities";

export interface CopyIconProps extends SVGImplementation {}

export const CopyIcon = ({ size = 1, className }: CopyIconProps) => {
	return (
		<svg
			width={size * 14}
			height={size * 16}
			viewBox="0 0 14 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>Copy</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.091 5.09088C13.091 3.88589 12.1142 2.90906 10.9092 2.90906H5.091C3.88602 2.90906 2.90918 3.88589 2.90918 5.09088V13.8181C2.90918 15.0232 3.88602 16 5.091 16H10.9092C12.1142 16 13.091 15.0232 13.091 13.8181V5.09088ZM11.6365 5.09088C11.6365 4.68922 11.3109 4.3636 10.9092 4.3636H5.091C4.68934 4.3636 4.36373 4.68922 4.36373 5.09088V13.8181C4.36373 14.2198 4.68934 14.5454 5.091 14.5454H10.9092C11.3109 14.5454 11.6365 14.2198 11.6365 13.8181V5.09088Z"
				fill="currentColor"
			/>
			<path
				d="M2.18182 1.45455H9.45454C9.85622 1.45455 10.1818 1.12893 10.1818 0.727273C10.1818 0.325615 9.85622 0 9.45454 0H2.18182C0.976836 0 0 0.976836 0 2.18182V12.3636C0 12.7653 0.325615 13.0909 0.727273 13.0909C1.12893 13.0909 1.45455 12.7653 1.45455 12.3636V2.18182C1.45455 1.78016 1.78016 1.45455 2.18182 1.45455Z"
				fill="currentColor"
			/>
		</svg>
	);
};
