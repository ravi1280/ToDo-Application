import { Edit2, Trash2, Calendar, Flag, Tag, CheckCircle2 } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import { formatDateShort, isTaskOverdue, getDaysUntilDue } from '../utils/dateUtils';
import './TaskItem.css';

const TaskItem = ({ task, provided }) => {
    const { toggleTaskComplete, toggleSubtaskComplete, deleteTask, openEditTaskForm } = useTaskContext();

    const priorityConfig = {
        high: { color: 'danger', icon: '🔴' },
        medium: { color: 'warning', icon: '🟡' },
        low: { color: 'success', icon: '🟢' }
    };

    const isOverdue = isTaskOverdue(task.dueDate, task.completed);
    const daysUntil = getDaysUntilDue(task.dueDate);

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(task.id);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        openEditTaskForm(task);
    };

    const handleToggle = (e) => {
        e.stopPropagation();
        toggleTaskComplete(task.id);
    };

    const completedSubtasks = task.subtasks?.filter(st => st.completed).length || 0;
    const totalSubtasks = task.subtasks?.length || 0;

    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
        >
            {/* Toggle Button */}
            <div className="task-toggle-wrapper">
                <button
                    onClick={handleToggle}
                    className={`task-toggle ${task.completed ? 'completed' : ''}`}
                    aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                    <span className="toggle-slider"></span>
                </button>
            </div>

            {/* Main Content */}
            <div className="task-content">
                <div className="task-header">
                    <h3 className="task-title">{task.title}</h3>
                    <div className="task-actions">
                        <button onClick={handleEdit} className="btn-icon" title="Edit task">
                            <Edit2 size={16} />
                        </button>
                        <button onClick={handleDelete} className="btn-icon btn-danger" title="Delete task">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}

                {/* Task Meta */}
                <div className="task-meta">
                    {/* Category */}
                    <div className="task-badge badge-primary">
                        <Tag size={12} />
                        <span>{task.category}</span>
                    </div>

                    {/* Priority */}
                    <div className={`task-badge badge-${priorityConfig[task.priority].color}`}>
                        <Flag size={12} />
                        <span>{task.priority}</span>
                    </div>

                    {/* Due Date */}
                    {task.dueDate && (
                        <div className={`task-badge ${isOverdue ? 'badge-danger' : 'badge-primary'}`}>
                            <Calendar size={12} />
                            <span>
                                {formatDateShort(task.dueDate)}
                                {daysUntil !== null && daysUntil >= 0 && !task.completed && (
                                    <span className="days-until"> ({daysUntil}d)</span>
                                )}
                            </span>
                        </div>
                    )}

                    {/* Subtasks Progress */}
                    {totalSubtasks > 0 && (
                        <div className="task-badge badge-success">
                            <CheckCircle2 size={12} />
                            <span>{completedSubtasks}/{totalSubtasks}</span>
                        </div>
                    )}
                </div>

                {/* Subtasks list with checkboxes */}
                {totalSubtasks > 0 && (
                    <div className="subtasks-list">
                        {task.subtasks.map((st) => (
                            <label key={st.id} className={`subtask-row ${st.completed ? 'completed' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={st.completed}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        toggleSubtaskComplete(task.id, st.id);
                                    }}
                                    className="checkbox subtask-checkbox"
                                />
                                <span className="subtask-title">{st.title}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskItem;
