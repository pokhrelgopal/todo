import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
interface Props {
  title: string;
  text: string;
  icon: string;
  handleConfirm: () => void;
  handleCancel: () => void;
}
const Alert = ({ title, text, icon, handleConfirm, handleCancel }: Props) => {
  MySwal.fire({
    title: title,
    text: text,
    icon: icon === "success" ? "success" : "error",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
  return;
};

export default Alert;
