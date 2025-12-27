import { format, isToday, isThisWeek, isPast, startOfDay } from 'date-fns';

export const formatDate = (date) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
};

export const formatDateShort = (date) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd');
};

export const isTaskToday = (date) => {
    if (!date) return false;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return isToday(dateObj);
};

export const isTaskThisWeek = (date) => {
    if (!date) return false;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return isThisWeek(dateObj, { weekStartsOn: 1 }); // Week starts on Monday
};

export const isTaskOverdue = (date, isCompleted) => {
    if (!date || isCompleted) return false;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return isPast(startOfDay(dateObj)) && !isToday(dateObj);
};

export const getDaysUntilDue = (date) => {
    if (!date) return null;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = startOfDay(new Date());
    const dueDate = startOfDay(dateObj);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};
