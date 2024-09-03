import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import Title from "../components/Title";
function TaskPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return (
    <div className="h-full  bg-slate-500 p-6">
      <div className="w-[500] space-y-4">
        <div className="flex justify-center relative m-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 bottom-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
          <Title> Detalhes da Tafefa</Title>
        </div>
        <div className="bg-slate-400 p-4 rounded-md">
          <h2 className="text-xl  font-bold text-slate-600">{title}</h2>
          <p className="text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
