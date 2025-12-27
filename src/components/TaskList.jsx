import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { Inbox } from 'lucide-react';
import './TaskList.css';

const TaskList = () => {
    const { getFilteredTasks, reorderTasks } = useTaskContext();
    const tasks = getFilteredTasks();

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destIndex = result.destination.index;

        if (sourceIndex !== destIndex) {
            reorderTasks(sourceIndex, destIndex);
        }
    };

    if (tasks.length === 0) {
        return (
            <div className="task-list-empty">
                <div className="empty-state">
                    <Inbox size={64} className="empty-icon" />
                    <h3 className="empty-title">No tasks found</h3>
                    <p className="empty-description">
                        Create a new task or adjust your filters to see tasks here.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="task-list-container">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                        >
                            {tasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={`task-item-wrapper ${snapshot.isDragging ? 'dragging' : ''}`}
                                        >
                                            <TaskItem task={task} provided={provided} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default TaskList;
