import { type PointerEvent, useRef, useState } from "react";

import type {
	GetThumbPositionInPercentageProps,
	ManageThumbUpdateProps,
	SliderProps,
} from "./Slider-types";

/**
 * Gets the position in percentage for the css anchor() function.
 *
 * It calculates the position based on the {@link sliderTrack}'s bounds and the clientX.
 */
const getThumbPositionInPercentage = ({
	sliderTrack,
	clientX,
}: GetThumbPositionInPercentageProps) => {
	const { left, right, width } = sliderTrack.getBoundingClientRect();

	if (clientX <= left) {
		return 0;
	}

	if (clientX >= right) {
		return 100;
	}

	const thumbPosition = clientX - left;

	const positionInPercentage = (thumbPosition / width) * 100;

	return positionInPercentage;
};

const sliderAnchor = "--slider-anchor";

const thumbSize = 18;

export const Slider = ({
	thumbColor,
	sliderTrackColor,
	initialPosition = 0,
	onThumbChange,
	renderChildren,
}: SliderProps) => {
	const sliderTrackRef = useRef<HTMLDivElement>(null);

	const [xPosition, setXPosition] = useState(initialPosition);

	const manageThumbUpdate = ({
		clientX,
		sliderTrack,
	}: ManageThumbUpdateProps) => {
		const position = getThumbPositionInPercentage({ clientX, sliderTrack });

		setXPosition(position);

		onThumbChange({ value: position });
	};

	const onPointerDown = (pointerEvent: PointerEvent) => {
		pointerEvent.preventDefault();

		const { pointerId, clientX } = pointerEvent;

		const sliderTrack = sliderTrackRef.current;

		if (!sliderTrack) {
			throw new Error("SliderTrack can't be null.");
		}

		sliderTrack.setPointerCapture(pointerId);

		manageThumbUpdate({ clientX, sliderTrack });
	};

	const onPointerMove = (pointerEvent: PointerEvent) => {
		const { pointerId, clientX } = pointerEvent;

		const sliderTrack = sliderTrackRef.current;

		if (!sliderTrack) {
			throw new Error("SliderTrack can't be null.");
		}

		if (!sliderTrack.hasPointerCapture(pointerId)) {
			return;
		}

		manageThumbUpdate({ clientX, sliderTrack });
	};

	const onPointerUp = (pointerEvent: PointerEvent) => {
		const { pointerId } = pointerEvent;

		const sliderTrack = sliderTrackRef.current;

		if (!sliderTrack) {
			throw new Error("SliderTrack can't be null.");
		}

		sliderTrack.releasePointerCapture(pointerId);
	};

	return (
		<div
			ref={sliderTrackRef}
			className="h-4 overflow-clip rounded-full"
			style={{
				// @ts-ignore
				anchorScope: sliderAnchor,
				anchorName: sliderAnchor,
				background: sliderTrackColor,
			}}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
		>
			<span
				className="absolute z-50 rounded-full border-2 border-white shadow-[0px_0px_4px_1px_#888]"
				style={{
					// @ts-ignore
					positionAnchor: sliderAnchor,
					alignSelf: "anchor-center",
					width: `${thumbSize}px`,
					height: `${thumbSize}px`,
					left: `calc(anchor(${xPosition}%) - ${thumbSize / 2}px)`,
					background: thumbColor,
				}}
				onPointerDown={onPointerDown}
				onPointerUp={onPointerUp}
			/>
			{renderChildren?.({ sliderAnchor })}
		</div>
	);
};
