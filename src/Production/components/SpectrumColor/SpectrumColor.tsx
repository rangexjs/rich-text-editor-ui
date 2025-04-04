import { type PointerEvent, useEffect, useRef, useState } from "react";

import transparentBg from "@public/transparent.jpg";
import { Color, type HSLFormat } from "@utilities";

import { type OnThumbChangeFn, type RenderChildrenFn, Slider } from "../Slider";

import type {
	GetAlphaThumbPositionProps,
	GetHorizontalThumbPositionProps,
	GetHueThumbPositionProps,
	GetPositionFromSaturationLightnessProps,
	GetPositionFromSaturationLightnessReturn,
	GetSaturationLightnessFromPositionProps,
	GetSaturationLightnessFromPositionReturn,
	GetThumbPositionInPercentageProps,
	GetThumbPositionInPercentageReturn,
	GetVerticalThumbPositionProps,
	ManageColorUpdateProps,
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

const getHueThumbPosition = ({ hue }: GetHueThumbPositionProps) =>
	Math.round((hue / 359) * 100);

const getAlphaThumbPosition = ({ alpha }: GetAlphaThumbPositionProps) =>
	Math.round(alpha * 100);

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
	className,
	style,
	onColorChange,
}: SpectrumColorProps) => {
	const thumbInitialPosition = getPositionFromSaturationLightness({
		saturation: hsl.s,
		lightness: hsl.l,
	});

	const [thumbPosition, setThumbPosition] = useState<ThumbPosition>({
		xPosition: thumbInitialPosition.xPosition,
		yPosition: thumbInitialPosition.yPosition,
	});

	const [scopedHSL, setScopedHSL] = useState<HSLFormat>({
		h: Number.NaN,
		s: Number.NaN,
		l: Number.NaN,
		a: Number.NaN,
	});

	const initialHueThumbPosition = getHueThumbPosition({ hue: hsl.h });

	const [hueThumbPosition, setHueThumbPosition] = useState(
		initialHueThumbPosition,
	);

	const initialAlphaThumbPosition = getAlphaThumbPosition({ alpha: hsl.a });

	const [alphaThumbPosition, setAlphaThumbPosition] = useState(
		initialAlphaThumbPosition,
	);

	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (
			hsl.h === scopedHSL.h &&
			hsl.s === scopedHSL.s &&
			hsl.l === scopedHSL.l &&
			hsl.a === scopedHSL.a
		) {
			return;
		}

		setScopedHSL(hsl);

		const { xPosition, yPosition } = getPositionFromSaturationLightness({
			saturation: hsl.s,
			lightness: hsl.l,
		});

		setThumbPosition({ xPosition, yPosition });

		const updatedHueThumbPosition = getHueThumbPosition({ hue: hsl.h });

		setHueThumbPosition(updatedHueThumbPosition);

		const updatedAlphaThumbPosition = getAlphaThumbPosition({ alpha: hsl.a });

		setAlphaThumbPosition(updatedAlphaThumbPosition);
	}, [hsl, scopedHSL]);

	const hslColor = Color.hsl(hsl).color();

	const filledHslColor = Color.hsl({ ...hsl, a: 1 }).color();

	const hueColor = Color.hsl({ h: hsl.h, s: 100, l: 50, a: 1 }).color();

	const hueSliderTrackColor = Array.from({ length: 12 }, (_, i) =>
		Color.hsl({ h: i * 30, s: 100, l: 50, a: 1 }).color(),
	).join(", ");

	const alphaSliderTrackColor = Color.hsl({ ...hsl, a: 0.7 }).color();

	const manageColorUpdate = ({ hsl }: ManageColorUpdateProps) => {
		setScopedHSL(hsl);

		onColorChange({ hsl });
	};

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

		manageColorUpdate({ hsl: { ...hsl, s: roundedS, l: roundedL } });
	};

	const onPointerDown = (pointerEvent: PointerEvent) => {
		pointerEvent.preventDefault();

		const { pointerId, clientX, clientY } = pointerEvent;

		const panel = panelRef.current;

		if (!panel) {
			throw new Error("Panel can't be null.");
		}

		panel.setPointerCapture(pointerId);

		panel.style.cursor = "move";

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

		panel.style.removeProperty("cursor");
	};

	const onHueThumbChange: OnThumbChangeFn = ({ position: value }) => {
		const hue = Math.round(359 * (value / 100));

		manageColorUpdate({ hsl: { ...hsl, h: hue } });

		setHueThumbPosition(value);
	};

	const onAlphaThumbChange: OnThumbChangeFn = ({ position: value }) => {
		const alpha = +(value / 100).toFixed(2);

		manageColorUpdate({ hsl: { ...hsl, a: alpha } });

		setAlphaThumbPosition(value);
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
		<div className={`inline-block ${className ?? ""}`} style={style}>
			<div
				ref={panelRef}
				className="cursor-crosshair"
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
					<span className="relative h-11 w-11 overflow-clip rounded-full">
						<span
							className="absolute inset-0"
							style={{ background: `url(${transparentBg}) center / 500%` }}
						/>
						<span
							className="absolute inset-0"
							style={{ backgroundColor: hslColor }}
						/>
					</span>
					<div className="flex flex-grow flex-col justify-between">
						<Slider
							thumbColor={hueColor}
							sliderTrackColor={`linear-gradient(to right, ${hueSliderTrackColor})`}
							position={hueThumbPosition}
							className="cursor-crosshair"
							onThumbChange={onHueThumbChange}
						/>
						<Slider
							thumbColor="#b3b3b3"
							sliderTrackColor={`url(${transparentBg}) center / 120%`}
							position={alphaThumbPosition}
							className="cursor-crosshair"
							onThumbChange={onAlphaThumbChange}
							renderChildren={renderAlphaSliderChildren}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
