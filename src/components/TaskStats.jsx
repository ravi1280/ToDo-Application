import { CheckCircle2, Circle, AlertCircle, TrendingUp, BarChart3 } from 'lucide-react';
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

    const chartData = [
        {
            label: 'Completed',
            value: stats.completed,
            percentage: stats.total > 0 ? (stats.completed / stats.total) * 100 : 0,
            color: 'completed'
        },
        {
            label: 'In Progress',
            value: stats.active,
            percentage: stats.total > 0 ? (stats.active / stats.total) * 100 : 0,
            color: 'active'
        },
        {
            label: 'Overdue',
            value: stats.overdue,
            percentage: stats.total > 0 ? (stats.overdue / stats.total) * 100 : 0,
            color: 'overdue'
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
                <>
                    {/* Completion Progress Bar */}
                    <div className="completion-progress">
                        <div className="progress-header">
                            <span className="progress-label">Overall Completion</span>
                            <span className="progress-percentage">{stats.completionRate}%</span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${stats.completionRate}%` }}
                            />
                        </div>
                    </div>

                    {/* Professional Chart */}
                    <div className="task-chart">
                        <div className="chart-header">
                            <div className="chart-title-wrapper">
                                <BarChart3 size={20} className="chart-icon" />
                                <h3 className="chart-title">Task Analytics</h3>
                            </div>
                            <div className="chart-subtitle">Distribution Overview</div>
                        </div>

                        <div className="chart-content">
                            <div className="chart-bars">
                                {chartData.map((item, index) => (
                                    <div key={index} className="chart-bar-group">
                                        <div className="chart-bar-wrapper">
                                            <div
                                                className={`chart-bar chart-bar-${item.color}`}
                                                style={{ height: `${item.percentage}%` }}
                                            >
                                                <div className="chart-bar-inner">
                                                    <span className="chart-bar-value">{item.value}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chart-bar-footer">
                                            <span className="chart-bar-label">{item.label}</span>
                                            <span className="chart-bar-percent">{Math.round(item.percentage)}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskStats;
