import { Calendar, Tag, Flag, Filter, X } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import './TaskFilters.css';

const TaskFilters = () => {
    const { filters, setFilters, categories } = useTaskContext();

    const views = [
        { value: 'all', label: 'All Tasks', icon: <Filter size={16} /> },
        { value: 'today', label: 'Today', icon: <Calendar size={16} /> },
        { value: 'week', label: 'This Week', icon: <Calendar size={16} /> }
    ];

    const priorities = [
        { value: 'all', label: 'All' },
        { value: 'high', label: 'High', color: 'danger' },
        { value: 'medium', label: 'Medium', color: 'warning' },
        { value: 'low', label: 'Low', color: 'success' }
    ];

    const statuses = [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' }
    ];

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearAllFilters = () => {
        setFilters({
            view: 'all',
            category: 'all',
            priority: 'all',
            status: 'all'
        });
    };

    const activeFilterCount = Object.values(filters).filter(v => v !== 'all').length;

    return (
        <div className="task-filters">
            {/* View Selector */}
            <div className="filter-section">
                <div className="filter-label">
                    <span>View</span>
                </div>
                <div className="filter-chips">
                    {views.map(view => (
                        <button
                            key={view.value}
                            onClick={() => updateFilter('view', view.value)}
                            className={`filter-chip ${filters.view === view.value ? 'active' : ''}`}
                        >
                            <span>{view.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Filter */}
            <div className="filter-section">
                <div className="filter-label">
                    <span>Category</span>
                </div>
                <div className="filter-chips">
                    <button
                        onClick={() => updateFilter('category', 'all')}
                        className={`filter-chip ${filters.category === 'all' ? 'active' : ''}`}
                    >
                        All
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => updateFilter('category', category)}
                            className={`filter-chip ${filters.category === category ? 'active' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Priority Filter */}
            <div className="filter-section">
                <div className="filter-label">
                    <span>Priority</span>
                </div>
                <div className="filter-chips">
                    {priorities.map(priority => (
                        <button
                            key={priority.value}
                            onClick={() => updateFilter('priority', priority.value)}
                            className={`filter-chip priority-${priority.color} ${filters.priority === priority.value ? 'active' : ''
                                }`}
                        >
                            {priority.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Status Filter */}
            <div className="filter-section">
                <div className="filter-label">
                    <span>Status</span>
                </div>
                <div className="filter-chips">
                    {statuses.map(status => (
                        <button
                            key={status.value}
                            onClick={() => updateFilter('status', status.value)}
                            className={`filter-chip ${filters.status === status.value ? 'active' : ''}`}
                        >
                            {status.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
                <button onClick={clearAllFilters} className="clear-filters-btn">
                    <X size={16} />
                    <span>Clear Filters ({activeFilterCount})</span>
                </button>
            )}
        </div>
    );
};

export default TaskFilters;
