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
}: SliderProps) => {
	const thumbRef = useRef<HTMLSpanElement>(null);

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

		const { currentTarget, pointerId, clientX } = pointerEvent;

		if (!(currentTarget instanceof HTMLDivElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		currentTarget.setPointerCapture(pointerId);

		manageThumbUpdate({ clientX, sliderTrack: currentTarget });
	};

	const onPointerMove = (pointerEvent: PointerEvent) => {
		const { currentTarget, pointerId, clientX } = pointerEvent;

		if (!(currentTarget instanceof HTMLDivElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		if (!currentTarget.hasPointerCapture(pointerId)) {
			return;
		}

		const thumb = thumbRef.current;

		if (!thumb) {
			throw new Error("Thumb can't be null.");
		}

		manageThumbUpdate({ clientX, sliderTrack: currentTarget });
	};

	const onPointerUp = (pointerEvent: PointerEvent) => {
		const { currentTarget, pointerId } = pointerEvent;

		if (!(currentTarget instanceof HTMLDivElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		currentTarget.releasePointerCapture(pointerId);
	};

	return (
		<div
			className="h-4 rounded-full"
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
				ref={thumbRef}
				className="pointer-events-none absolute rounded-full border-2 border-white shadow-[0px_0px_4px_1px_#888]"
				style={{
					// @ts-ignore
					positionAnchor: sliderAnchor,
					alignSelf: "anchor-center",
					width: `${thumbSize}px`,
					height: `${thumbSize}px`,
					left: `calc(anchor(${xPosition}%) - ${thumbSize / 2}px)`,
					background: thumbColor,
				}}
			/>
		</div>
	);
};
