import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import Title from "../components/Title";
import Input from "../components/Input";
import { useState } from "react";
function EditTaskPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <div className="flex justify-center relative mb-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 bottom-0 text-slate-100"
        >
          <ChevronLeftIcon />
        </button>
        <Title>Editar Tafefa</Title>
      </div>
      <Input type="text" placeholder="Digite a descrição" value={newTitle} />
      <Input
        type="text"
        placeholder="Digite a descrição"
        value={newDescription}
      />
      <button
        onClick={() => {
          if (newTitle === title || newDescription === description)
            return alert("Altera os dados cabeco");
          props.onAddTask(title, description);
        }}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium "
      >
        Editar Tarefa
      </button>
    </div>
  );
}

export default EditTaskPage;
