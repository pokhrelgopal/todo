import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
interface Props {
  title: string;
  text: string;
  icon: "success" | "error";
}
export function showNotice({ title, text, icon }: Props) {
  MySwal.fire({
    title: title,
    text: text,
    icon: icon === "success" ? "success" : "error",
  });
}
