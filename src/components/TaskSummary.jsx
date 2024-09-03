function TaskSummary({ tasks }) {
  const counts = tasks.reduce(
    (acc, task) => {
      if (task.isCompleted) {
        acc.completed += 1;
      } else {
        acc.open += 1;
      }
      return acc;
    },
    { open: 0, completed: 0 }
  );

  return (
    <div className="p-4 bg-white rounded-md shadow-md w-[25vw]">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center">
          <span className="font-semibold text-lg">Tarefas Abertas:</span>
          <span className="ml-2 text-blue-500">{counts.open}</span>
        </div>
        <div className="flex flex-wrap items-center">
          <span className="font-semibold text-lg">Tarefas Concluídas:</span>
          <span className="ml-2 text-green-500">{counts.completed}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskSummary;
