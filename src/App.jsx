import OderFromOurBakery from "./components/Content/OderFromOurBakery";
import Bakery from "./components/Content/OderFromOurBakery/CakeItem/Bakery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Header/Cart";
import { listCake } from "./components/Content/OderFromOurBakery/ListCake";
import SignupLoginForm from "./components/Content/SignupLoginForm/SignupLoginForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  useGetAllPokemonQuery,
  useGetNextPokemonQuery,
  useGetPokemonByNameQuery,
} from "./services/Redux/store";
import { useSelector } from "react-redux";
function App() {
  // const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  const { data, error, isLoading } = useGetAllPokemonQuery();

  // const getPokemon = useSelector((state) => state.pokemonApi);
  // console.log(getPokemon);
  const result = useGetNextPokemonQuery(data?.next);
  console.log(result);

  return (
    <div className="container_lg">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<OderFromOurBakery listCake={listCake} />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/bakery/:cakeId"
            element={<Bakery listCake={listCake} />}
          />
          <Route
            path="/login"
            element={<SignupLoginForm />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
