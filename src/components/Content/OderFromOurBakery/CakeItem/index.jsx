import "./CakeItems.css";
import { Link } from "react-router-dom";
function CakeItems(props) {
  const { cake } = props;
  return (
    <div className="item">
      <Link to={`/bakery/${cake.id}`}>
        <figure>
          <img src={cake.image} />
        </figure>
      </Link>
      <h3>{cake.name}</h3>
      <p>from ${cake.price}.00</p>
    </div>
  );
}

export default CakeItems;
