import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { Camisa } from "../../interface/camisetaDataInterface";

interface Categoria {
  id: number;
  nome: string;
}

interface Props {
  opened: boolean;
  closeModal: () => void;
  addCamisa: (camisa: Camisa) => void;
  editingCamisa?: Camisa | null;
  onSave?: (updatedCamisa: Camisa) => void;
}

function MModal({ opened, closeModal, addCamisa, editingCamisa, onSave }: Props) {
  const [title, setTitle] = useState(editingCamisa?.title || "");
  const [price, setPrice] = useState(editingCamisa?.price.toString() ||"");
  const [image, setImage] = useState(editingCamisa?.image || "");
  const [categoriaId, setCategoriaId] = useState<number | undefined>(editingCamisa?.categoria_id);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  

  useEffect(() => {
    if (editingCamisa) {
      setTitle(editingCamisa.title || "");
      setPrice(editingCamisa.price.toString() || "");
      setImage(editingCamisa.image || "");
      setCategoriaId(editingCamisa.categoria_id || undefined);
    } else {
      setTitle("");
      setPrice("");
      setImage("");
      setCategoriaId(undefined);
    }
  }, [editingCamisa]);

  

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await axios.get(`http://localhost:8080/categoria`);
      setCategorias(response.data);
    };
    fetchCategorias();
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const camisa = {
      id: editingCamisa?.id, title,
      price: parseFloat(price),
      image,
      categoria_id: categoriaId,
    }as Camisa;

    if(editingCamisa && onSave) {
      onSave(camisa);
    } else {
      const res = await axios.post(`http://localhost:8080/camiseta`, camisa);
      if(res.status === 200) { 
        addCamisa(res.data);
        }
      }
      closeModal();
      window.location.reload();
    }

  return (
    <>
      <Modal show={opened} onHide={closeModal} data-bs-theme="dark">
        <Form onSubmit={(event) => submit(event)}>
          <Modal.Header closeButton>
            <Modal.Title>Criar camisa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Image src={image} style={{ maxWidth: "15rem", maxHeight: "15rem" }} />
            </Row>

            <Row>
              <Form.Label htmlFor="inputImage">Link da imagem</Form.Label>
              <Form.Control
                type="text"
                id="image"
                value={image}
                aria-describedby="imageHelp"
                onChange={(event) => setImage(event.target.value)}
              />
              <Form.Text id="imageHelp" muted>
                Insira o Link da Imagem da Camiseta*
              </Form.Text>
            </Row>

            <Row>
              <Form.Label htmlFor="inputTitle">Titulo</Form.Label>
              <Form.Control
                type="text"
                id="title"
                value={title}
                aria-describedby="titleHelp"
                onChange={(event) => setTitle(event.target.value)}
              />
              <Form.Text id="titleHelp" muted>
                Titulo deve ser o nome do time*
              </Form.Text>
            </Row>

            <Row>
              <Form.Label htmlFor="inputPreco">Preco</Form.Label>
              <Form.Control
                type="number"
                id="price"
                value={price}
                aria-describedby="priceHelp"
                onChange={(event) => setPrice(event.target.value)}
              />
              <Form.Text id="priceHelp" muted>
                Preco da camisa do time*
              </Form.Text>
            </Row>


            <Row>
              <Form.Label htmlFor="inputCategoria">Categoria</Form.Label>
              <Form.Select
                id="categoria"
                value={categoriaId}
                aria-describedby="categoriaHelp"
                onChange={(event) => setCategoriaId(Number(event.target.value))}
              >
                <option value="">Selecione uma Categoria</option>
                {Array.isArray(categorias) && categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </Form.Select>
              <Form.Text id="categoriaHelp" muted>
                Selecione a categoria da camisa*
              </Form.Text>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default MModal;