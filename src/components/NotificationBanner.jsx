import { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import { isTaskOverdue } from '../utils/dateUtils';
import './NotificationBanner.css';

const NotificationBanner = () => {
    const { tasks } = useTaskContext();
    const [visible, setVisible] = useState(false);
    const [overdueTasks, setOverdueTasks] = useState([]);

    useEffect(() => {
        const overdue = tasks.filter(task => isTaskOverdue(task.dueDate, task.completed));
        setOverdueTasks(overdue);

        if (overdue.length > 0) {
            setVisible(true);
            // Auto-dismiss after 10 seconds
            const timer = setTimeout(() => {
                setVisible(false);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [tasks]);

    if (!visible || overdueTasks.length === 0) return null;

    return (
        <div className="notification-banner">
            <div className="notification-content">
                <AlertCircle size={20} className="notification-icon" />
                <div className="notification-text">
                    <strong>Overdue Tasks!</strong>
                    <span>
                        You have {overdueTasks.length} overdue task{overdueTasks.length > 1 ? 's' : ''} that need attention.
                    </span>
                </div>
            </div>
            <button onClick={() => setVisible(false)} className="btn-icon notification-close">
                <X size={18} />
            </button>
        </div>
    );
};

export default NotificationBanner;
