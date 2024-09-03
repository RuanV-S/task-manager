import { UserCircle2Icon } from "lucide-react";
import Button from "./Button";
import Title from "./Title";

function Header() {
  return (
    <div className="w-screen flex justify-between pb-5 pt-5">
      <img />
      <Title>Gerenciador de Tarefas</Title>
      <Button className="mx-5">
        <UserCircle2Icon className="hidden" />
      </Button>
    </div>
  );
}

export default Header;
