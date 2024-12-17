import type { HSLFormat } from "@utilities";

interface TabIdentifier {
	grid: "Grid";
	spectrum: "Spectrum";
}

type GetTabName<Name extends keyof TabIdentifier> = TabIdentifier[Name];

type GetTabAnchor<Key extends keyof TabIdentifier> = `--${Key}-anchor`;

export type TabName = GetTabName<keyof TabIdentifier>;

export type TabAnchors = GetTabAnchor<keyof TabIdentifier>;

export type TabItem = {
	[Key in keyof TabIdentifier]: {
		name: GetTabName<Key>;
		anchorName: `--${Key}-anchor`;
	};
}[keyof TabIdentifier];

export type TabList = TabItem[];

export type ColorPaletteOnClickFn = (color: string) => void;

export interface ColorPaletteProps {
	paletteColors: string[];
	paletteCols: number;
	isHidden: boolean;
	onClick: (color: string) => void;
}

interface OnSelectedColorFnProps {
	hsl: HSLFormat | null;
}

export type OnColorSelected = (props: OnSelectedColorFnProps) => void;

export interface ColorPanelProps {
	activeColors: string[];
	onColorSelected: OnColorSelected;
}
