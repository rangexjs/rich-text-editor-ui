import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Triangle } from "../Triangle";

import type { PrimaryCharInputProps } from "./PrimaryCharInput-types";

export const PrimaryCharInput = ({
	inputRef,
	inputProps,
	title,
	className,
	isInvalid,
	invalidMessage,
}: PrimaryCharInputProps) => {
	const [inputValue, setInputValue] = useState(inputProps.value ?? "");
	const [titleHeight, setTitleHeight] = useState(Number.NaN);
	const [isFocus, setIsFocus] = useState(false);

	const titleRef = useRef<HTMLSpanElement>(null);

	const primaryCharInputAnchor = "--primary-char-input";

	useEffect(() => {
		setInputValue(inputProps.value ?? "");
	}, [inputProps.value]);

	useLayoutEffect(() => {
		const title = titleRef.current;

		if (!title) {
			return;
		}

		const resizeObserver = new ResizeObserver((entries) => {
			for (const { target } of entries) {
				if (!(target instanceof HTMLSpanElement)) {
					throw new Error("Target's type is invalid.");
				}

				const { height } = target.getBoundingClientRect();

				setTitleHeight(height);
			}
		});

		resizeObserver.observe(title);

		const { height } = title.getBoundingClientRect();

		setTitleHeight(height);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	const onInputChange = (event: React.ChangeEvent) => {
		const { currentTarget } = event;

		if (!(currentTarget instanceof HTMLInputElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		const { value } = currentTarget;

		setInputValue(value);

		inputProps.onChange?.({ value });
	};

	const onClick = (event: React.MouseEvent) => {
		inputProps.onClick?.({ event });
	};

	const onFocus = (event: React.FocusEvent) => {
		setIsFocus(true);

		inputProps.onFocus?.({ event });
	};

	const isTitleOnInput = isFocus || inputValue || inputProps.placeholder;

	const titleTop = (() => {
		if (isTitleOnInput) {
			return `calc(anchor(top) - ${titleHeight / 2}px)`;
		}

		return `calc(anchor(50%) - ${titleHeight / 2}px)`;
	})();

	const isShowInvalid = isInvalid && invalidMessage && isFocus;

	const inputColors = isInvalid
		? "focus:shadow-error/15 focus:border-error/40"
		: "focus:shadow-primary/15 focus:border-primary/40";

	return (
		<div
			className={`bg-white ${className ?? ""}`}
			style={{
				// @ts-ignore
				anchorScope: primaryCharInputAnchor,
				anchorName: primaryCharInputAnchor,
			}}
		>
			{title && (
				<span
					ref={titleRef}
					className="pointer-events-none absolute bg-inherit px-1 text-xs"
					style={{
						// @ts-ignore
						positionAnchor: primaryCharInputAnchor,
						top: titleTop,
						left: "calc(anchor(left) + 8px)",
						transition: inputProps.placeholder ? "0ms" : "200ms",
						opacity: isTitleOnInput ? "" : "0.6",
					}}
				>
					{title}
				</span>
			)}
			<input
				ref={inputRef}
				type={inputProps.type}
				value={inputValue}
				placeholder={inputProps.placeholder}
				readOnly={inputProps.readOnly}
				className={` ${inputColors} w-full rounded-sm border border-slate-400/30 bg-inherit p-2 text-sm transition-[border-color,_box-shadow] focus:shadow-[0_0_0_4px]`}
				style={{ ...inputProps.style }}
				onChange={onInputChange}
				onClick={onClick}
				onFocus={onFocus}
				onBlur={() => {
					setIsFocus(false);
				}}
			/>
			<Triangle
				width={18}
				height={10}
				className="absolute bg-error/40"
				style={{
					// @ts-ignore
					positionAnchor: primaryCharInputAnchor,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
					display: isShowInvalid ? "" : "none",
				}}
			/>
			<div
				className="absolute z-50 mt-2 rounded-xs border border-error/40 bg-white p-1 text-xs shadow-sm"
				style={{
					// @ts-ignore
					positionAnchor: primaryCharInputAnchor,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
					display: isShowInvalid ? "" : "none",
					maxWidth: "calc(anchor-size(width) * 2)",
				}}
			>
				{invalidMessage}
			</div>
		</div>
	);
};
