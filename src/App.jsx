import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import TaskSummary from "./components/TaskSummary";
import Header from "./components/Header";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  function onTaskClick(TaksId) {
    const newTasks = tasks.map((task) => {
      if (task.id === TaksId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onTrashClick(TaksId) {
    const newTasks = tasks.filter((task) => task.id !== TaksId);
    setTasks(newTasks);
  }

  function onAddTask(title, description, periodo, date) {
    const newTasks = [
      ...tasks,
      {
        id: tasks.length + 1,
        title: title,
        description: description,
        isCompleted: false,
        date: new Date(date).getTime() + 86400000, // Adiciona 1 dia
        period: periodo,
      },
    ];
    setTasks(newTasks);
  }

  useEffect(() => {
    // Salvar os dados em local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="h-screen bg-slate-500 flex">
      <div className=" space-y-4">
        <Header />
        <div className="flex flex-wrap  justify-center m-5 gap-8">
          <AddTask onAddTask={onAddTask} />
          <TaskSummary tasks={tasks} />
        </div>

        <div className="m-5">
          <Tasks
            tasks={tasks}
            onTaskClick={onTaskClick}
            onTrashClick={onTrashClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
