import { CheckCircle2, Circle, AlertCircle, TrendingUp } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import './TaskStats.css';

const TaskStats = () => {
    const { getStats } = useTaskContext();
    const stats = getStats();

    const statCards = [
        {
            icon: <Circle size={24} />,
            label: 'Total Tasks',
            value: stats.total,
            color: 'primary'
        },
        {
            icon: <CheckCircle2 size={24} />,
            label: 'Completed',
            value: stats.completed,
            color: 'success'
        },
        {
            icon: <TrendingUp size={24} />,
            label: 'Active',
            value: stats.active,
            color: 'warning'
        },
        {
            icon: <AlertCircle size={24} />,
            label: 'Overdue',
            value: stats.overdue,
            color: 'danger'
        }
    ];

    return (
        <div className="task-stats">
            <div className="stats-grid">
                {statCards.map((stat, index) => (
                    <div key={index} className={`stat-card stat-${stat.color}`}>
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-content">
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {stats.total > 0 && (
                <div className="completion-progress">
                    <div className="progress-header">
                        <span className="progress-label">Completion Rate</span>
                        <span className="progress-percentage">{stats.completionRate}%</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${stats.completionRate}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskStats;
