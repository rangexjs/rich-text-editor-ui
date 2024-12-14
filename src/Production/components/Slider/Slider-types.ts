export interface GetThumbPositionInPercentageProps {
	sliderTrack: HTMLDivElement;
	clientX: number;
}

export interface ManageThumbUpdateProps {
	clientX: number;
	sliderTrack: HTMLDivElement;
}

interface OnThumbChangeFnProps {
	value: number;
}

export type OnThumbChangeFn = (props: OnThumbChangeFnProps) => void;

export interface SliderProps {
	thumbColor: string;
	sliderTrackColor: string;
	initialPosition?: number;
	onThumbChange: OnThumbChangeFn;
}
