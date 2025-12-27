import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import './TaskForm.css';

const TaskForm = () => {
    const { isFormOpen, editingTask, closeTaskForm, addTask, updateTask, categories, addCategory } = useTaskContext();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Personal',
        priority: 'medium',
        dueDate: '',
        subtasks: []
    });

    const [newCategory, setNewCategory] = useState('');
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [newSubtask, setNewSubtask] = useState('');

    useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title || '',
                description: editingTask.description || '',
                category: editingTask.category || 'Personal',
                priority: editingTask.priority || 'medium',
                dueDate: editingTask.dueDate || '',
                subtasks: editingTask.subtasks || []
            });
        } else {
            setFormData({
                title: '',
                description: '',
                category: 'Personal',
                priority: 'medium',
                dueDate: '',
                subtasks: []
            });
        }
    }, [editingTask, isFormOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            addCategory(newCategory.trim());
            setFormData(prev => ({ ...prev, category: newCategory.trim() }));
            setNewCategory('');
            setShowNewCategory(false);
        }
    };

    const handleAddSubtask = () => {
        if (newSubtask.trim()) {
            setFormData(prev => ({
                ...prev,
                subtasks: [...prev.subtasks, { id: Date.now().toString(), title: newSubtask.trim(), completed: false }]
            }));
            setNewSubtask('');
        }
    };

    const handleRemoveSubtask = (subtaskId) => {
        setFormData(prev => ({
            ...prev,
            subtasks: prev.subtasks.filter(st => st.id !== subtaskId)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert('Please enter a task title');
            return;
        }

        if (editingTask) {
            updateTask(editingTask.id, formData);
        } else {
            addTask(formData);
        }

        closeTaskForm();
    };

    if (!isFormOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeTaskForm}>
            <div className="modal task-form-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        {editingTask ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <button onClick={closeTaskForm} className="btn-icon">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="task-form">
                    {/* Title */}
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            Title <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input"
                            placeholder="Enter task title..."
                            required
                            autoFocus
                        />
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="input"
                            placeholder="Add a description..."
                            rows="3"
                        />
                    </div>

                    {/* Category and Priority Row */}
                    <div className="form-row">
                        {/* Category */}
                        <div className="form-group">
                            <label htmlFor="category" className="form-label">
                                Category
                            </label>
                            {showNewCategory ? (
                                <div className="new-category-input">
                                    <input
                                        type="text"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        className="input"
                                        placeholder="New category..."
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                                    />
                                    <button type="button" onClick={handleAddCategory} className="btn btn-primary">
                                        Add
                                    </button>
                                    <button type="button" onClick={() => setShowNewCategory(false)} className="btn btn-ghost">
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="category-select-wrapper">
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="input"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => setShowNewCategory(true)}
                                        className="btn btn-ghost btn-sm"
                                    >
                                        <Plus size={14} />
                                        New
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Priority */}
                        <div className="form-group">
                            <label htmlFor="priority" className="form-label">
                                Priority
                            </label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="input"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    {/* Due Date */}
                    <div className="form-group">
                        <label htmlFor="dueDate" className="form-label">
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Subtasks */}
                    <div className="form-group">
                        <label className="form-label">Subtasks</label>
                        <div className="subtasks-container">
                            {formData.subtasks.map(subtask => (
                                <div key={subtask.id} className="subtask-item">
                                    <span>{subtask.title}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSubtask(subtask.id)}
                                        className="btn-icon btn-sm"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            <div className="subtask-input">
                                <input
                                    type="text"
                                    value={newSubtask}
                                    onChange={(e) => setNewSubtask(e.target.value)}
                                    className="input"
                                    placeholder="Add a subtask..."
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubtask())}
                                />
                                <button type="button" onClick={handleAddSubtask} className="btn btn-ghost">
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button type="button" onClick={closeTaskForm} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {editingTask ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
