import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import logger from "use-reducer-logger";
const reducer = function (state, action) {
  //first we define the function to update the state for the useReducer
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatchFunc] = useReducer(
    //useReducer has two arguments: first is the reducer, which is the function defined to update these state
    //the second argument is the initial state of the component that has 3 properties
    //WE MUST CONSIDER THE RETURN OF useREDUCER FIRST
    //useReducer return an array with two values:
    //1: state
    //2: dispatch=> a function that is used to dispatch actions to the reducers
    //dispatch is the function to update the state (loading,error,products) (ussually pass the object has "type")

    //=> the order matters
    //logger(reducer) is to see the state changes
    logger(reducer),
    {
      loading: false,
      error: "",
      products: [],
    }
  );

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatchFunc({ type: "FETCH_REQUEST" });
      //first it will run the dispatch with action,type=request
      //=> set current state and loading=true;
      try {
        const result = await axios.get("/api/products");
        //if it run this, it means it has no error
        dispatchFunc({ type: "FETCH_SUCCESS", payload: result.data });
        //because it has no error it will run dispatch with action.type=success, and action.payload=result.data
        //=> the products will = action.payload and loading=false
        //payload is the data you want to send
      } catch (err) {
        dispatchFunc({ type: "FETCH_FAIL", payload: err.message });
        //if it run this, it will has error so loading=false, action.payload=err.message&& error=action.payload
      }

      //setProducts(result.data);
    };
    fetchData();
    //after define the fetchData async function => run it
  }, []);
  // npm install use-reducer-logger --force: to see the logs of state changes
  return loading ? (
    <div>LOADING...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <h1>Featured Products</h1>

      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.slug}>
            {/* use key to fix error each child has unique key */}
            <Link to={`/product/${product.slug}`}>
              {/* use the {} to dynamic, the `` to get object property */}
              <img src={product.image} alt={product.name}></img>
            </Link>
            <div className="product-info">
              <Link to={"/product/" + product.slug}>
                <p>{product.name}</p>
              </Link>

              <p>
                <strong>$</strong>
                {product.price}
              </p>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeScreen;
