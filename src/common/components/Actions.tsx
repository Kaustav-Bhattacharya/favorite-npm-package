import view from "../../assets/icons/eye.png";
import edit from "../../assets/icons/edit.png";
import del from "../../assets/icons/delete.png";

interface DeleteProps {
  onClick: () => void;
}

interface ViewProps {
  onShow: () => void;
}

const Veiw: React.FC<ViewProps> = ({ onShow }) => {
  return (
    <img
      src={view}
      alt=""
      className="w-5 h-5 bg-transparent hover:border-none cursor-pointer"
      onClick={onShow}
    />
  );
};

const Edit: React.FC = () => {
  return (
    <img
      src={edit}
      alt=""
      className="w-5 h-5 bg-transparent hover:border-none cursor-pointer"
    />
  );
};

const Delete: React.FC<DeleteProps> = ({ onClick }) => {
  return (
    <img
      src={del}
      alt=""
      className="w-5 h-5 bg-transparent hover:border-none cursor-pointer"
      onClick={onClick}
    />
  );
};

export { Veiw, Edit, Delete };
