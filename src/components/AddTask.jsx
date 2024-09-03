import { useState } from "react";
import Input from "./Input";

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  return (
    <div className="w-[70vw] space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Digite a tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        type="text"
        placeholder="Digite a descrição"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <label>
        <select
          value={periodo}
          className="w-full border border-slate-300 px-2 py-2 rounded-md"
          onChange={(event) => setPeriodo(event.target.value)}
        >
          <option value="">Selecione um período</option>
          <option value="Manhã">Manhã</option>
          <option value="Tarde">Tarde</option>
          <option value="Noite">Noite</option>
        </select>
      </label>
      <button
        onClick={() => {
          if (!title.trim() || !description.trim() || !periodo.trim())
            return alert("Preencha os campos cabaco");
          props.onAddTask(title, description, periodo, date);
          setDescription("");
          setTitle("");
          setPeriodo("");
        }}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium "
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
