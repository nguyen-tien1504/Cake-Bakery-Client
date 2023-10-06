import CakeItems from "./CakeItem/index";
import "./OderFromOurBakery.css";
import Title from "./Title/index.jsx";
function OderFromOurBakery(props) {
  const { listCake } = props;
  return (
    <div>
      <Title />
      <div className="container">
        {listCake.map((cake) => (
          <CakeItems
            key={cake.id}
            cake={cake}
          />
        ))}
      </div>
    </div>
  );
}

export default OderFromOurBakery;
