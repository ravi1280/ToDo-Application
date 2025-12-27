import { useState, useEffect } from 'react';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskStats from './components/TaskStats';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import NotificationBanner from './components/NotificationBanner';
import { saveTheme, loadTheme } from './utils/storageUtils';
import './App.css';

function App() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = loadTheme();
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        saveTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <TaskProvider>
            <div className="app">
                <NotificationBanner />

                <div className="app-container">
                    <Header theme={theme} toggleTheme={toggleTheme} />

                    <TaskStats />

                    <div className="main-content">
                        <aside className="sidebar-left">
                            <TaskFilters />
                        </aside>

                        <main className="content-right">
                            <TaskList />
                        </main>
                    </div>
                </div>

                <TaskForm />
            </div>
        </TaskProvider>
    );
}

export default App;
