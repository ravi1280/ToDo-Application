import { Search, Plus, Moon, Sun } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import './Header.css';

const Header = ({ theme, toggleTheme }) => {
    const { searchQuery, setSearchQuery, openNewTaskForm } = useTaskContext();

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-left">
                    <div className="logo">
                        <div className="logo-icon">✓</div>
                        <h1 className="logo-text">TaskFlow</h1>
                    </div>
                </div>

                <div className="header-center">
                    <div className="search-bar">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="header-right">
                    <button
                        onClick={toggleTheme}
                        className="btn-icon theme-toggle"
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button onClick={openNewTaskForm} className="btn btn-primary new-task-btn">
                        <Plus size={18} />
                        <span>New Task</span>
                        <span className="keyboard-hint">Ctrl+N</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
