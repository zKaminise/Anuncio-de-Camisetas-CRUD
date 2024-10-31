import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

interface Props {
  price: number,
  title: string,
  image: string,
  categoriaNome?: string;
  onDelete: (id: number) => void, 
  onEdit: () => void;
}

export function Card({price, image, title, categoriaNome, onDelete, onEdit} : Props) {
  return(
      <div className="card col-6" style={{width: "20rem"}} >
        <img src={image} className="card-img-top" style={{ maxWidth: "17rem", minWidth: "17rem", maxHeight: "18rem", minHeight: "18rem", padding: "10px 0 5px 20px" }} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Preco: {price},00</p>
          <p className="card-text"> {categoriaNome} </p>
          <Button variant="warning" onClick={onEdit}>Editar</Button>{" "}
          <Button variant="danger" onClick={() => onDelete(5)}> Excluir </Button>
        </div>
      </div>
  )
}
