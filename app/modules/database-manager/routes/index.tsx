import { useNavigate } from "react-router";
import { ShowTables } from "../components/show-tables";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

export default function DatabaseManagerRoute() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-2xl text-center">Gerenciamento de Banco de Dados</h1>
      <div className="mt-4 mb-4 flex justify-end">
        <Button
          color="success"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/database-manager/create-table")}
        >
          Criar Tabela
        </Button>
      </div>
      <ShowTables />
      <br />
    </>
  );
}
