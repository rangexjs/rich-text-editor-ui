import { useEffect, useRef, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import { TableIcon } from "../../../SVGs";

import type {
	OnSquareButtonClickProps,
	SquareStateList,
	TableToolbarButtonProps,
} from "./TableToolbarButton-types";

export const TableToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: TableToolbarButtonProps) => {
	const numberOfRows = 10;
	const numberOfCols = 10;

	const grid = Array.from(
		{ length: numberOfRows * numberOfCols },
		(_, i) => i + 1,
	);

	const inactiveSquareStateList: SquareStateList = grid.map((index) => ({
		index,
		isActive: false,
	}));

	const [isChecked, setIsChecked] = useState(false);
	const [squareStateList, setSquareStateList] = useState<SquareStateList>(
		inactiveSquareStateList,
	);
	const [squareNumbers, setSquareNumber] = useState({ row: 1, col: 1 });

	const popoverTargetElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			return;
		}

		const onToggle = (event: ToggleEvent) => {
			const { newState } = event;

			if (newState === "open") {
				setIsChecked(true);
			}

			if (newState === "closed") {
				setIsChecked(false);
				setSquareStateList(inactiveSquareStateList);
				setSquareNumber({ row: 1, col: 1 });
			}
		};

		// @ts-ignore
		popoverTargetElement.addEventListener("toggle", onToggle);

		return () => {
			// @ts-ignore
			popoverTargetElement.removeEventListener("toggle", onToggle);
		};
	}, [inactiveSquareStateList]);

	const tableToolbarButtonAnchor = "--table-toolbar-button";

	const squareSize = 14;

	const onPointerOver = (pointerEvent: React.PointerEvent) => {
		const { currentTarget, target } = pointerEvent;

		if (!(target instanceof HTMLButtonElement)) {
			return;
		}

		if (!(currentTarget instanceof HTMLDivElement)) {
			throw new Error("CurrentTarget's type is invalid.");
		}

		const childNodesArray = [...currentTarget.childNodes];

		const selectedIndex = childNodesArray.indexOf(target);

		const selectedColIndex = selectedIndex % numberOfCols;

		const selectedRowIndex = Math.floor(selectedIndex / numberOfCols);

		const updatedSquareStateList: SquareStateList = [];

		for (let i = 0; i < squareStateList.length; i++) {
			const colIndex = i % numberOfCols;
			const rowIndex = Math.floor(i / numberOfCols);

			const isActive =
				colIndex <= selectedColIndex && rowIndex <= selectedRowIndex;

			updatedSquareStateList.push({ index: i, isActive });
		}

		setSquareStateList(updatedSquareStateList);

		setSquareNumber({ row: selectedRowIndex + 1, col: selectedColIndex + 1 });
	};

	const onSquareButtonClick = ({ index }: OnSquareButtonClickProps) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		setSquareStateList(inactiveSquareStateList);
		setSquareNumber({ row: 1, col: 1 });

		const selectedColIndex = index % numberOfCols;

		const selectedRowIndex = Math.floor(index / numberOfCols);

		const column = selectedColIndex + 1;
		const row = selectedRowIndex + 1;

		toolbarButtonsActionManager.onNodeInsertion?.({
			type: "table",
			column,
			row,
		});
	};

	return (
		<>
			<PrimaryButton
				checked={isChecked}
				disabled={state.isDisabled}
				isChevron={true}
				anchorName={tableToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
			>
				<TableIcon />
			</PrimaryButton>
			<div
				ref={popoverTargetElementRef}
				popover="auto"
				className="absolute mt-1 rounded-md border border-slate-200 bg-white p-1 leading-[0] shadow-md"
				style={{
					// @ts-ignore
					positionAnchor: tableToolbarButtonAnchor,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
				}}
			>
				<div
					className="inline-grid"
					style={{
						gridTemplateColumns: `repeat(${numberOfCols}, ${squareSize}px)`,
						gridTemplateRows: `repeat(${numberOfRows}, ${squareSize}px)`,
					}}
					onPointerOver={onPointerOver}
				>
					{squareStateList.map(({ index, isActive }) => (
						<button
							key={index}
							type="button"
							data-is-active={isActive}
							className="group cursor-default p-px"
							onClick={() => onSquareButtonClick({ index })}
						>
							<span className="pointer-events-none inline-block h-full w-full rounded-sm border border-slate-200 group-data-[is-active=true]:border-primary group-data-[is-active=true]:bg-primary group-data-[is-active=true]:bg-opacity-20" />
						</button>
					))}
				</div>
				<div className="mt-1 text-center text-sm">
					{squareNumbers.row} x {squareNumbers.col}
				</div>
			</div>
		</>
	);
};
