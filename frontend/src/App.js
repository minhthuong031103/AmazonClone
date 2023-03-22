import data from "./data";

function App() {
  return (
    <div>
      <header>
        <a href="/">Amazona</a>
      </header>
      <main>
        <h1>Featured Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              {/* use key to fix error each child has unique key */}
              <a href={`/product/${product.slug}`}>
                {/* use the {} to dynamic, the `` to get object property */}
                <img src={product.image} alt={product.name}></img>
              </a>
              <div className="product-info">
                <a href={"/product/" + product.slug}>
                  <p>{product.name}</p>
                </a>

                <p>
                  <strong>$</strong>
                  {product.price}
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
