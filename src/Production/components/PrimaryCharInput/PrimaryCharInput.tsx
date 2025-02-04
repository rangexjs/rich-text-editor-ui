import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { PrimaryCharInputProps } from "./PrimaryCharInput-types";

export const PrimaryCharInput = ({
	inputProps,
	title,
	className,
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

	const isTitleOnInput = isFocus || inputValue || inputProps.placeholder;

	const titleTop = (() => {
		if (isTitleOnInput) {
			return `calc(anchor(top) - ${titleHeight / 2}px)`;
		}

		return `calc(anchor(50%) - ${titleHeight / 2}px)`;
	})();

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
				type={inputProps.type}
				value={inputValue}
				onChange={onInputChange}
				placeholder={inputProps.placeholder}
				readOnly={inputProps.readOnly}
				className="primary-char-input w-full bg-inherit p-2 text-sm"
				style={{ ...inputProps.style }}
				onFocus={() => setIsFocus(true)}
				onBlur={() => {
					setIsFocus(false);
				}}
			/>
		</div>
	);
};
