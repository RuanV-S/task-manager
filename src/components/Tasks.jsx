import {
  BadgeCheck,
  CalendarRange,
  ChevronRightIcon,
  CircleDashed,
  CloudSunIcon,
  Eye,
  EyeOff,
  MoonIcon,
  PencilIcon,
  SunIcon,
  TrashIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useMemo, useState } from "react";

function Tasks({ tasks, onTrashClick, onTaskClick }) {
  const [visibleDates, setVisibleDates] = useState({});
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  function onEditTaskClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/edit-task?${query.toString()}`);
  }

  // Separa as tarefas por periodo (manhã/tarde/noite)
  const tasksByDateAndPeriod = useMemo(() => {
    return tasks.reduce((acc, task) => {
      const date = new Date(task.date).toLocaleDateString("pt-BR"); // Formata a data no formato "dd/mm"
      const period = task.period; // Obtém o período do dia a partir da tarefa
      if (!acc[date]) {
        acc[date] = { Manhã: [], Tarde: [], Noite: [] }; // Inicializa períodos para cada data
      }
      acc[date][period].push(task); // Adiciona a tarefa ao período correspondente
      return acc;
    }, {});
  }, [tasks]);

  // Verifica o periodo para adicionar o icon
  const periodIcon = {
    Manhã: <CloudSunIcon color="blue" />,
    Tarde: <SunIcon color="orange" />,
    Noite: <MoonIcon color="yellow" />,
  };

  // Ordena as datas para criar
  const sortedDates = Object.keys(tasksByDateAndPeriod).sort(
    (a, b) =>
      new Date(a.split("/").reverse().join("-")) -
      new Date(b.split("/").reverse().join("-"))
  );

  const toggleVisibility = (date) => {
    setVisibleDates((prevState) => ({
      ...prevState,
      [date]: !prevState[date],
    }));
  };

  return (
    <div className="p-6 bg-slate-200 rounded-md shadow">
      <div className="flex flex-wrap gap-6">
        {sortedDates.map((date) => {
          const tasksForDate = tasksByDateAndPeriod[date];
          const totalTasks = Object.values(tasksForDate).flat().length;
          const completedTasks = Object.values(tasksForDate)
            .flat()
            .filter((task) => task.isCompleted).length;

          return (
            <div
              key={date}
              className="flex-1 min-w-[400px] border p-4 bg-white rounded-md shadow-md"
            >
              <h2
                onClick={() => toggleVisibility(date)}
                className="text-xl font-bold mb-4 flex gap-2 items-center"
              >
                <CalendarRange color="blue" />
                {date}
                <button
                  className={`ml-4 text-sm flex gap-5 items-center ${
                    completedTasks === totalTasks
                      ? "text-green-500"
                      : "text-yellow-500"
                  }  `}
                >
                  {completedTasks}/{totalTasks}
                  {visibleDates[date] ? <Eye /> : <EyeOff color="white" />}
                </button>
              </h2>

              {visibleDates[date] && (
                <div className="max-h-[250px] px-2 overflow-y-auto">
                  {Object.keys(tasksForDate).map((period) => (
                    <div key={period}>
                      <h3 className="text-lg font-bold mb-4 flex gap-2 mt-5 items-center">
                        {periodIcon[period]} {period}
                      </h3>
                      <ul className="space-y-2">
                        {tasksForDate[period]
                          .sort((a, b) => new Date(a.date) - new Date(b.date)) // Ordenar por data
                          .map((task) => (
                            <li key={task.id} className="flex gap-2">
                              <Button
                                onClick={() => onTaskClick(task.id)}
                                className={`bg-slate-400 text-left text-white flex items-center gap-2 w-full p-2 rounded-md ${
                                  task.isCompleted ? "line-through" : ""
                                }`}
                              >
                                {task.isCompleted ? (
                                  <BadgeCheck className="w-8 h-8 text-green-500" />
                                ) : (
                                  <CircleDashed className="w-8 h-8 text-yellow-100 animate-swing" />
                                )}
                                {task.title.substring(0, 20)}
                              </Button>

                              <Button onClick={() => onSeeDetailsClick(task)}>
                                <ChevronRightIcon />
                              </Button>
                              <Button onClick={() => onEditTaskClick(task)}>
                                <PencilIcon />
                              </Button>
                              <Button onClick={() => onTrashClick(task.id)}>
                                <TrashIcon color="red" />
                              </Button>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tasks;
