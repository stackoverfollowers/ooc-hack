import { Stack, Text, createStyles } from '@mantine/core';
import BoardCard from '../card/BoardCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useListState } from '@mantine/hooks';

const useStyles = createStyles(theme => ({
	item: {
		...theme.fn.focusStyles(),
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
		marginBottom: theme.spacing.sm,
	},

	itemDragging: {
		boxShadow: theme.shadows.sm,
	},
}));

const BoardColumnBody = ({
	data = [{ id: 'A' }, { id: 'B' }],
}: {
	data?: { id: string }[];
}) => {
	const { classes, cx } = useStyles();

	const [state, handlers] = useListState(data);

	const items = state.map((item, index) => (
		<Draggable key={item.id} index={index} draggableId={item.id}>
			{(provided, snapshot) => (
				<BoardCard
					className={cx(classes.item, {
						[classes.itemDragging]: snapshot.isDragging,
					})}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				/>
			)}
		</Draggable>
	));

	return (
		<DragDropContext
			onDragEnd={({ destination, source }) =>
				handlers.reorder({ from: source.index, to: destination?.index || 0 })
			}
		>
			<Droppable droppableId="dnd-list" direction="vertical">
				{provided => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{items}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
export default BoardColumnBody;
