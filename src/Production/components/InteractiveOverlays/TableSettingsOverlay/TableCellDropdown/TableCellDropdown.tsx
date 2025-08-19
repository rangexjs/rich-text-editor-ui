import { Fragment, useRef } from "react";

import { InfoIcon } from "../../../SVGs";
import { Triangle } from "../../../Triangle";

import type {
	ButtonInfoProps,
	TableCellDropdownProps,
} from "./TableCellDropdown-types";

const ButtonInfo = ({ disabled, disabledReason }: ButtonInfoProps) => {
	const bridgeRef = useRef<HTMLSpanElement>(null);
	const triangleRef = useRef<HTMLSpanElement>(null);
	const infoPopoverRef = useRef<HTMLDivElement>(null);

	const updateTriangleVisibility = (
		event: React.ToggleEvent<HTMLSpanElement>,
	) => {
		const bridge = bridgeRef.current;
		const triangle = triangleRef.current;

		if (!bridge) {
			throw new Error("Bridge can't be null.");
		}

		if (!triangle) {
			throw new Error("Triangle can't be null.");
		}

		const { newState } = event;

		if (newState === "open") {
			bridge.style.removeProperty("display");
			triangle.style.removeProperty("display");
		}

		if (newState === "closed") {
			bridge.style.display = "none";
			triangle.style.display = "none";
		}
	};

	const updatePopoverVisibility = (status: "show" | "hide") => {
		const infoPopover = infoPopoverRef.current;

		if (!infoPopover) {
			throw new Error("InfoPopover can't be null.");
		}

		({
			show: () => infoPopover.showPopover(),
			hide: () => infoPopover.hidePopover(),
		})[status]();
	};

	const buttonInfoAnchor = "--button-info-anchor";

	return (
		<span
			role="img"
			// biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
			tabIndex={0}
			style={{
				// @ts-ignore
				anchorScope: buttonInfoAnchor,
				anchorName: buttonInfoAnchor,
				visibility: disabled && disabledReason ? undefined : "hidden",
			}}
			onPointerEnter={() => updatePopoverVisibility("show")}
			onPointerLeave={() => updatePopoverVisibility("hide")}
			onFocus={() => updatePopoverVisibility("show")}
			onBlur={() => updatePopoverVisibility("hide")}
			onToggle={updateTriangleVisibility}
		>
			<span
				ref={bridgeRef}
				className="absolute inline-block h-1.5"
				style={{
					// @ts-ignore
					positionAnchor: buttonInfoAnchor,
					top: "anchor(bottom)",
					width: "anchor-size(width)",
					display: "none",
				}}
			/>
			<InfoIcon className="text-blue-500" />
			<Triangle
				width={10}
				height={6}
				ref={triangleRef}
				className="absolute bg-slate-300"
				style={{
					// @ts-ignore
					positionAnchor: buttonInfoAnchor,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
					display: "none",
				}}
			/>
			<span
				ref={infoPopoverRef}
				role="tooltip"
				// @ts-ignore hint hasn't supported yet
				popover="hint"
				className="mt-1.5 max-w-52 bg-transparent shadow-sm "
				style={{
					// @ts-ignore
					positionAnchor: buttonInfoAnchor,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
				}}
			>
				<span className="inline-block rounded-sm border border-slate-300 bg-white p-1 text-xs shadow-lg">
					{disabledReason}
				</span>
			</span>
		</span>
	);
};

export const TableCellDropdown = ({
	popoverTargetElementRef,
	buttonsGroup,
}: TableCellDropdownProps) => {
	return (
		<div
			ref={popoverTargetElementRef}
			className="mt-2 rounded-md border border-slate-200 bg-white p-1 shadow-md"
			popover="auto"
			style={{
				top: "anchor(bottom)",
				justifySelf: "anchor-center",
			}}
		>
			{buttonsGroup.map((buttons, index) => (
				<Fragment key={index}>
					<div className="flex flex-col text-sm">
						{buttons.map(({ name, disabled, disabledReason, onClick }) => (
							<span
								key={name}
								className={`inline-flex items-center gap-1 transition-colors hover:bg-slate-50 ${disabled && "text-gray-400 hover:bg-transparent"}`}
							>
								<button
									type="button"
									className="grow rounded-xs p-2 text-left "
									disabled={disabled}
									onClick={onClick}
								>
									{name}
								</button>
								<span className="inline-flex items-center pr-2">
									<ButtonInfo
										disabled={disabled}
										disabledReason={disabledReason}
									/>
								</span>
							</span>
						))}
					</div>
					{buttonsGroup.length - 1 > index && <hr className="my-1" />}
				</Fragment>
			))}
		</div>
	);
};
