import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mixin = withReactContent(Swal)
  //configuração do sweetalert fica dentro do mixim
  .mixin({});

export default mixin;
