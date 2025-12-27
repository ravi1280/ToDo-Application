# TaskFlow - Modern To-Do Application

A feature-rich, modern To-Do application built with React, featuring task management, organization tools, and a premium user experience.

![TaskFlow](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Essential Features
- ✅ **Task Management**: Create, edit, delete, and complete tasks
- 📝 **Rich Task Details**: Add titles, descriptions, and notes
- ✔️ **Checkbox Toggle**: Quick complete/incomplete marking
- 🎯 **Categories & Tags**: Organize tasks by custom categories
- 🚩 **Priority Levels**: High, medium, and low priority with visual indicators
- 📅 **Due Dates**: Calendar picker for setting deadlines
- 🔍 **Search & Filter**: Find tasks quickly with powerful filtering

### User Experience
- 🎨 **Modern UI**: Clean, intuitive interface with glassmorphic design
- 🌓 **Dark/Light Mode**: Toggle between themes
- 🎭 **Drag & Drop**: Reorder tasks effortlessly
- ⌨️ **Keyboard Shortcuts**: Quick task creation (Ctrl+N)
- ✨ **Visual Feedback**: Strikethrough for completed tasks, animations
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile

### Nice-to-Have Features
- 📋 **Subtasks**: Break down larger tasks into smaller steps
- 📊 **Task Statistics**: Completion rate, total tasks, overdue count
- 📆 **View Filters**: Today, This Week, All tasks
- 🔔 **Notifications**: Alerts for overdue tasks
- 💾 **Auto-Save**: LocalStorage persistence

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ToDo-Application.git
   cd ToDo-Application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

### Creating a Task
1. Click the "New Task" button or press `Ctrl+N`
2. Fill in the task details:
   - Title (required)
   - Description (optional)
   - Category
   - Priority level
   - Due date
   - Subtasks (optional)
3. Click "Create Task"

### Managing Tasks
- **Complete**: Click the checkbox next to a task
- **Edit**: Click the edit icon on a task card
- **Delete**: Click the delete icon and confirm
- **Reorder**: Drag and drop tasks to change their order

### Filtering Tasks
- **View**: Filter by All, Today, or This Week
- **Category**: Click category chips to filter
- **Priority**: Filter by High, Medium, or Low priority
- **Status**: Show All, Active, or Completed tasks
- **Search**: Type in the search bar to find specific tasks

### Keyboard Shortcuts
- `Ctrl+N` (or `Cmd+N` on Mac): Create new task

## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with modern design patterns
- **State Management**: React Context API
- **Drag & Drop**: react-beautiful-dnd
- **Date Handling**: date-fns
- **Icons**: lucide-react
- **Storage**: LocalStorage

## 📁 Project Structure

```
ToDo-Application/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TaskStats.jsx
│   │   ├── TaskFilters.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskForm.jsx
│   │   └── NotificationBanner.jsx
│   ├── context/
│   │   └── TaskContext.jsx
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── storageUtils.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Design Features

- **Glassmorphism**: Modern frosted glass effect on cards
- **Gradient Accents**: Vibrant color gradients throughout
- **Smooth Animations**: Micro-interactions for better UX
- **Premium Typography**: Inter font family
- **Responsive Grid**: Adapts to all screen sizes

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ using React and Vite
