import { PrimaryButton } from "../../../PrimaryButton";
import { TodoListIcon } from "../../../SVGs";

import type { TodoListToolbarButtonProps } from "./TodoListToolbarButton-types";

export const TodoListToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: TodoListToolbarButtonProps) => {
	const onClick = () => {
		toolbarButtonsActionManager.onNodeInsertion?.({ type: "todoList" });
	};

	return (
		<PrimaryButton disabled={state.isDisabled} onClick={onClick}>
			<TodoListIcon />
		</PrimaryButton>
	);
};
