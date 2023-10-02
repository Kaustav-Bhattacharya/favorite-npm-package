import view from "../../assets/icons/eye.png";
import edit from "../../assets/icons/edit.png";
import del from "../../assets/icons/delete.png";

interface ActionProps {
  onClick:React.MouseEventHandler<HTMLImageElement> | undefined;
}

const View: React.FC<ActionProps> = ({ onClick }) => {
  return (
    <img
      src={view}
      alt=""
      className="w-5 h-5 bg-transparent hover:border-none cursor-pointer"
      onClick={onClick}
    />
  );
};

const Edit: React.FC<ActionProps> = ({onClick}) => {
  return (
    <img
      src={edit}
      alt=""
      className="w-5 h-5 bg-transparent hover:border-none cursor-pointer"
      onClick={onClick}
    />
  );
};

const Delete: React.FC<ActionProps> = ({ onClick }) => {
  return (
    <img
      src={del}
      alt=""
      className="w-5 h-5 bg-transparent hover:border-none cursor-pointer"
      onClick={onClick}
    />
  );
};

export { View, Edit, Delete };
