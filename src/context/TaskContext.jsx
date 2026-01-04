import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { saveTasks, loadTasks, saveCategories, loadCategories } from '../utils/storageUtils';
import { isTaskToday, isTaskThisWeek, isTaskOverdue } from '../utils/dateUtils';

const TaskContext = createContext();

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};

export const TaskProvider = ({ children }) => {
    // Initialize from localStorage to avoid StrictMode effect double-invoke clearing data
    const [tasks, setTasks] = useState(() => loadTasks());
    const [categories, setCategories] = useState(() => loadCategories());
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        view: 'all', // all, today, week
        category: 'all',
        priority: 'all',
        status: 'all' // all, active, completed
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // (Removed) mount-time load effect; we now lazily initialize state from localStorage

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    // Save categories to localStorage whenever they change
    useEffect(() => {
        saveCategories(categories);
    }, [categories]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            // Ctrl+N or Cmd+N to create new task
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                openNewTaskForm();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Task CRUD operations
    const addTask = useCallback((taskData) => {
        const newTask = {
            id: Date.now().toString(),
            title: taskData.title,
            description: taskData.description || '',
            category: taskData.category || 'Personal',
            priority: taskData.priority || 'medium',
            dueDate: taskData.dueDate || null,
            completed: false,
            subtasks: taskData.subtasks || [],
            createdAt: new Date().toISOString(),
            order: tasks.length
        };
        setTasks(prev => [newTask, ...prev]);
        return newTask;
    }, [tasks.length]);

    const updateTask = useCallback((taskId, updates) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
        ));
    }, []);

    const deleteTask = useCallback((taskId) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    }, []);

    const toggleTaskComplete = useCallback((taskId) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    }, []);

    const toggleSubtaskComplete = useCallback((taskId, subtaskId) => {
        setTasks(prev => prev.map(task => {
            if (task.id !== taskId) return task;
            const updatedSubtasks = (task.subtasks || []).map(st =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
            );
            return { ...task, subtasks: updatedSubtasks };
        }));
    }, []);

    const reorderTasks = useCallback((startIndex, endIndex) => {
        setTasks(prev => {
            const result = Array.from(prev);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            // Update order property
            return result.map((task, index) => ({ ...task, order: index }));
        });
    }, []);

    // Category management
    const addCategory = useCallback((categoryName) => {
        if (!categories.includes(categoryName)) {
            setCategories(prev => [...prev, categoryName]);
        }
    }, [categories]);

    // Form management
    const openNewTaskForm = useCallback(() => {
        setEditingTask(null);
        setIsFormOpen(true);
    }, []);

    const openEditTaskForm = useCallback((task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    }, []);

    const closeTaskForm = useCallback(() => {
        setIsFormOpen(false);
        setEditingTask(null);
    }, []);

    // Filtered tasks based on search and filters
    const getFilteredTasks = useCallback(() => {
        let filtered = [...tasks];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query)
            );
        }

        // View filter (today, this week, all)
        if (filters.view === 'today') {
            filtered = filtered.filter(task => isTaskToday(task.dueDate));
        } else if (filters.view === 'week') {
            filtered = filtered.filter(task => isTaskThisWeek(task.dueDate));
        }

        // Category filter
        if (filters.category !== 'all') {
            filtered = filtered.filter(task => task.category === filters.category);
        }

        // Priority filter
        if (filters.priority !== 'all') {
            filtered = filtered.filter(task => task.priority === filters.priority);
        }

        // Status filter
        if (filters.status === 'active') {
            filtered = filtered.filter(task => !task.completed);
        } else if (filters.status === 'completed') {
            filtered = filtered.filter(task => task.completed);
        }

        return filtered;
    }, [tasks, searchQuery, filters]);

    // Statistics
    const getStats = useCallback(() => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const active = total - completed;
        const overdue = tasks.filter(t => isTaskOverdue(t.dueDate, t.completed)).length;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { total, completed, active, overdue, completionRate };
    }, [tasks]);

    const value = {
        tasks,
        categories,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        isFormOpen,
        editingTask,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        toggleSubtaskComplete,
        reorderTasks,
        addCategory,
        openNewTaskForm,
        openEditTaskForm,
        closeTaskForm,
        getFilteredTasks,
        getStats
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};
