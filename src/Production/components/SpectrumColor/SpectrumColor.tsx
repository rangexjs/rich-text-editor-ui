import { type PointerEvent, useEffect, useRef, useState } from "react";

import transparentBg from "@public/transparent.jpg";

import { type OnThumbChangeFn, type RenderChildrenFn, Slider } from "../Slider";

import type {
	GetHSLColorProps,
	GetHorizontalThumbPositionProps,
	GetPositionFromSaturationLightnessProps,
	GetPositionFromSaturationLightnessReturn,
	GetSaturationLightnessFromPositionProps,
	GetSaturationLightnessFromPositionReturn,
	GetThumbPositionInPercentageProps,
	GetThumbPositionInPercentageReturn,
	GetVerticalThumbPositionProps,
	ManageThumbUpdateProps,
	SpectrumColorProps,
	ThumbPosition,
} from "./SpectrumColor-types";

const getPositionFromSaturationLightness = ({
	saturation,
	lightness,
}: GetPositionFromSaturationLightnessProps): GetPositionFromSaturationLightnessReturn => {
	const s = saturation / 100;
	const l = lightness / 100;

	const lightFactor = s * (l < 0.5 ? l : 1 - l);

	const xPosition =
		(lightFactor === 0 ? 0 : (2 * lightFactor) / (l + lightFactor)) * 100;

	const yPosition = (l + lightFactor) * 100;

	return { xPosition, yPosition };
};

const getHSLColor = ({ h, s, l, a }: GetHSLColorProps) =>
	`hsl(${h}deg, ${s}%, ${l}%, ${a})` as const;

const getHorizontalThumbPosition = ({
	clientX,
	panelLeft,
	panelRight,
	panelWidth,
}: GetHorizontalThumbPositionProps) => {
	if (clientX <= panelLeft) {
		return 0;
	}

	if (clientX >= panelRight) {
		return 100;
	}

	const thumbPosition = clientX - panelLeft;

	const positionInPercentage = (thumbPosition / panelWidth) * 100;

	return positionInPercentage;
};

const getVerticalThumbPosition = ({
	clientY,
	panelTop,
	panelBottom,
	panelHeight,
}: GetVerticalThumbPositionProps) => {
	if (clientY <= panelTop) {
		return 100;
	}

	if (clientY >= panelBottom) {
		return 0;
	}

	const thumbPosition = panelBottom - clientY;

	const positionInPercentage = (thumbPosition / panelHeight) * 100;

	return positionInPercentage;
};

/**
 * Gets the position in percentage for the css anchor() function.
 *
 * It calculates the position based on the {@link sliderTrack}'s bounds and the client(X|Y).
 */
const getThumbPositionInPercentage = ({
	panel,
	clientX,
	clientY,
}: GetThumbPositionInPercentageProps): GetThumbPositionInPercentageReturn => {
	const { bottom, height, left, right, top, width } =
		panel.getBoundingClientRect();

	const xPosition = getHorizontalThumbPosition({
		clientX,
		panelLeft: left,
		panelRight: right,
		panelWidth: width,
	});

	const yPosition = getVerticalThumbPosition({
		clientY,
		panelTop: top,
		panelBottom: bottom,
		panelHeight: height,
	});

	return { xPosition, yPosition };
};

const getSaturationLightnessFromPosition = ({
	xPosition,
	yPosition,
}: GetSaturationLightnessFromPositionProps): GetSaturationLightnessFromPositionReturn => {
	const xPercentage = xPosition / 100;
	const yPercentage = yPosition / 100;

	const lightnessScale = (2 - xPercentage) * yPercentage;

	const lightness = (lightnessScale / 2) * 100;

	if (xPercentage === 0 || yPercentage === 0) {
		return { saturation: 0, lightness };
	}

	const saturation =
		((xPercentage * yPercentage) /
			(lightnessScale < 1 ? lightnessScale : 2 - lightnessScale)) *
		100;

	return { saturation, lightness };
};

const panelAnchor = "--panel-anchor";

const thumbSize = 18;

export const SpectrumColor = ({
	hsl,
	panelWidth,
	panelHeight,
	onColorChange,
	className,
	style,
}: SpectrumColorProps) => {
	const thumbInitialPosition = getPositionFromSaturationLightness({
		saturation: hsl.s,
		lightness: hsl.l,
	});

	const [thumbPosition, setThumbPosition] = useState<ThumbPosition>({
		xPosition: thumbInitialPosition.xPosition,
		yPosition: thumbInitialPosition.yPosition,
	});

	const [isChangedFromColor, setIsChangedFromColor] = useState(true);
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		isChangedFromColor && setIsChangedFromColor(false);

		if (!isChangedFromColor) {
			return;
		}

		const { xPosition, yPosition } = getPositionFromSaturationLightness({
			saturation: hsl.s,
			lightness: hsl.l,
		});

		setThumbPosition({ xPosition, yPosition });
	}, [hsl, isChangedFromColor]);

	const hslColor = getHSLColor(hsl);

	const filledHslColor = getHSLColor({ ...hsl, a: 1 });

	const hueColor = getHSLColor({ h: hsl.h, s: 100, l: 50, a: 1 });

	const hueThumbInitialPosition = Math.round((hsl.h / 360) * 100);

	const hueSliderTrackColor = Array.from({ length: 12 }, (_, i) =>
		getHSLColor({ h: i * 30, s: 100, l: 50, a: 1 }),
	).join(", ");

	const alphaThumbInitialPosition = Math.round(hsl.a * 100);

	const alphaSliderTrackColor = getHSLColor({ ...hsl, a: 0.7 });

	const manageThumbUpdate = ({
		clientX,
		clientY,
		panel,
	}: ManageThumbUpdateProps) => {
		const { xPosition, yPosition } = getThumbPositionInPercentage({
			clientX,
			clientY,
			panel,
		});

		setThumbPosition({ xPosition, yPosition });

		const { saturation, lightness } = getSaturationLightnessFromPosition({
			xPosition,
			yPosition,
		});

		const roundedS = Math.round(saturation);
		const roundedL = Math.round(lightness);

		onColorChange({ hsl: { ...hsl, s: roundedS, l: roundedL } });
	};

	const onPointerDown = (pointerEvent: PointerEvent) => {
		pointerEvent.preventDefault();

		const { pointerId, clientX, clientY } = pointerEvent;

		const panel = panelRef.current;

		if (!panel) {
			throw new Error("Panel can't be null.");
		}

		panel.setPointerCapture(pointerId);

		manageThumbUpdate({ clientX, clientY, panel });
	};

	const onPointerMove = (pointerEvent: PointerEvent) => {
		const { pointerId, clientX, clientY } = pointerEvent;

		const panel = panelRef.current;

		if (!panel) {
			throw new Error("Panel can't be null.");
		}

		if (!panel.hasPointerCapture(pointerId)) {
			return;
		}

		manageThumbUpdate({ clientX, clientY, panel });
	};

	const onPointerUp = (pointerEvent: PointerEvent) => {
		const { pointerId } = pointerEvent;

		const panel = panelRef.current;

		if (!panel) {
			throw new Error("Panel can't be null.");
		}

		panel.releasePointerCapture(pointerId);
	};

	const onHueThumbChange: OnThumbChangeFn = ({ value }) => {
		const hue = Math.round(360 * (value / 100));

		onColorChange({ hsl: { ...hsl, h: hue } });
	};

	const onAlphaThumbChange: OnThumbChangeFn = ({ value }) => {
		const alpha = +(value / 100).toFixed(2);

		onColorChange({ hsl: { ...hsl, a: alpha } });
	};

	const renderAlphaSliderChildren: RenderChildrenFn = ({ sliderAnchor }) => (
		<div
			className="absolute rounded-full"
			style={{
				// @ts-ignore
				positionAnchor: sliderAnchor,
				top: "anchor(top)",
				left: "anchor(left)",
				right: "anchor(right)",
				bottom: "anchor(bottom)",
				background: `linear-gradient(to left, ${alphaSliderTrackColor}, #fff0)`,
			}}
		/>
	);

	return (
		<div className={`inline-block ${className}`} style={style}>
			<div
				ref={panelRef}
				style={{
					// @ts-ignore
					anchorScope: panelAnchor,
					anchorName: panelAnchor,
					width: `${panelWidth}px`,
					height: `${panelHeight}px`,
					backgroundColor: hueColor,
				}}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
			>
				<div
					className="absolute"
					style={{
						// @ts-ignore
						positionAnchor: panelAnchor,
						top: "anchor(top)",
						left: "anchor(left)",
						right: "anchor(right)",
						bottom: "anchor(bottom)",
						backgroundImage: `linear-gradient(to top, black, #fff0),
							linear-gradient(to right, white, #0000)`,
					}}
				/>
				<span
					className="absolute rounded-full border-2 border-white shadow-[0px_0px_4px_1px_#888]"
					style={{
						// @ts-ignore
						positionAnchor: panelAnchor,
						top: `calc(anchor(${100 - thumbPosition.yPosition}%) - ${thumbSize / 2}px)`,
						left: `calc(anchor(${thumbPosition.xPosition}%) - ${thumbSize / 2}px)`,
						width: `${thumbSize}px`,
						height: `${thumbSize}px`,
						backgroundColor: filledHslColor,
					}}
					onPointerDown={onPointerDown}
					onPointerUp={onPointerUp}
				/>
			</div>
			<div className="px-2 py-4">
				<div className="flex gap-6">
					<span
						className="relative h-11 w-11 overflow-clip rounded-full"
						style={{ backgroundColor: hslColor }}
					>
						<span
							className="absolute inset-0 z-[-1]"
							style={{ background: `url(${transparentBg}) center / 500%` }}
						/>
					</span>
					<div className="flex flex-grow flex-col justify-between">
						<Slider
							thumbColor={hueColor}
							sliderTrackColor={`linear-gradient(to right, ${hueSliderTrackColor})`}
							initialPosition={hueThumbInitialPosition}
							onThumbChange={onHueThumbChange}
						/>
						<Slider
							thumbColor="#b3b3b3"
							sliderTrackColor={`url(${transparentBg}) center / 120%`}
							initialPosition={alphaThumbInitialPosition}
							onThumbChange={onAlphaThumbChange}
							renderChildren={renderAlphaSliderChildren}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
