import { useEffect, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import { TodoListIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { TodoListToolbarButtonProps } from "./TodoListToolbarButton-types";

export const TodoListToolbarButton = ({
	toolbarButtonsActionManager,
	nodeInsertionButtonsStateManager,
}: TodoListToolbarButtonProps) => {
	const { todoList } = nodeInsertionButtonsStateManager;

	const [isDisabled, setIsDisabled] = useState(todoList.isDisabled);

	useEffect(() => {
		nodeInsertionButtonsStateManager.updateTodoListState = ({ isDisabled }) =>
			setIsDisabled(isDisabled);
	}, [nodeInsertionButtonsStateManager]);

	const onClick = () => {
		toolbarButtonsActionManager.onNodeInsertion?.({ type: "todoList" });
	};

	return (
		<PrimaryButton
			disabled={isDisabled}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<TodoListIcon />
		</PrimaryButton>
	);
};
