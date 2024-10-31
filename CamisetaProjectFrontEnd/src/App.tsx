import { useState, useEffect } from "react";
import {
  getCamisas,
  deleteCamisa,
  updateCamisa,
} from "./hooks/camisetaDataHooks";
import { Card } from "./components/card/card";
import { Camisa } from "./interface/camisetaDataInterface";
import "bootstrap/dist/css/bootstrap.min.css";
import MModal from "./components/modal";
import { Button } from "react-bootstrap";

function App() {
  const [props, setProps] = useState<Camisa[]>([]);
  const [show, setOpened] = useState(false);
  const [editingCamisa, setEditingCamisa] = useState<Camisa | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCamisas();
      setProps(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir a camiseta?");
    if (confirmDelete) {
      await deleteCamisa(id);
      window.location.reload();
    }
  };

  const handleEdit = (camisa: Camisa) => {
    setEditingCamisa(camisa);
    setOpened(true);
  };

  const handleUpdate = async (camisa: Camisa) => {
    const updatedCamisa = await updateCamisa(camisa);
    setProps(props.map((c) => (c.id === updatedCamisa.id ? updatedCamisa : c)));
  };

  return (
    <div className="container">
      <MModal
        opened={show}
        closeModal={() => {
          setEditingCamisa(null);
          setOpened(false)
        }}
        addCamisa={(novo) => setProps([...props, novo])}
        editingCamisa={editingCamisa}
        onSave={(updated) => handleUpdate(updated)}
      />

      <div className="row">
        <h1 className="col-6">Camisas de Time</h1>
        <div className=" col-md-3 offset-md-3">
          <Button variant="primary" onClick={() => setOpened(true)}>
            Anunciar Camisa
          </Button>
        </div>
      </div>
      <div className="container text-center">
        <div className="row">
          {props?.map((camisaData: Camisa) => (
            <Card
              key={camisaData.id}
              price={camisaData.price}
              title={camisaData.title}
              image={camisaData.image}
              categoriaNome={camisaData.categoriaNome}
              onDelete={() =>
                camisaData.id !== undefined && handleDelete(camisaData.id)
              }
              onEdit={() => handleEdit(camisaData)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
