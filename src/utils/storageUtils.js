const STORAGE_KEY = 'taskflow_tasks';
const CATEGORIES_KEY = 'taskflow_categories';
const THEME_KEY = 'taskflow_theme';

export const saveTasks = (tasks) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
        return false;
    }
};

export const loadTasks = () => {
    try {
        const tasksJson = localStorage.getItem(STORAGE_KEY);
        return tasksJson ? JSON.parse(tasksJson) : [];
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        return [];
    }
};

export const saveCategories = (categories) => {
    try {
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
        return true;
    } catch (error) {
        console.error('Error saving categories to localStorage:', error);
        return false;
    }
};

export const loadCategories = () => {
    try {
        const categoriesJson = localStorage.getItem(CATEGORIES_KEY);
        return categoriesJson ? JSON.parse(categoriesJson) : ['Personal', 'Work', 'Shopping', 'Health'];
    } catch (error) {
        console.error('Error loading categories from localStorage:', error);
        return ['Personal', 'Work', 'Shopping', 'Health'];
    }
};

export const saveTheme = (theme) => {
    try {
        localStorage.setItem(THEME_KEY, theme);
        return true;
    } catch (error) {
        console.error('Error saving theme to localStorage:', error);
        return false;
    }
};

export const loadTheme = () => {
    try {
        return localStorage.getItem(THEME_KEY) || 'dark';
    } catch (error) {
        console.error('Error loading theme from localStorage:', error);
        return 'dark';
    }
};

export const clearAllData = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(CATEGORIES_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
};
