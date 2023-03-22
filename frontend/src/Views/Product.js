import { useParams } from "react-router-dom";

function ProductScreen() {
  const params = useParams();
  //   useParams() retun an object that has the .property (the parameter that has the same name :)
  const slugObject = params;
  const { slug } = params;
  const slug1 = params.slug;
  //so if we use the const slug= params means that we will get the slug is the entire object=>
  // we have to slug.slug to get the value of parameter
  //   use {} because we will get the exact value of the property name slug of the params object
  // it means: const slug=params.slug
  return (
    <div>
      <h1>{params.slug}</h1>
      {/* 
      or we can use
      <h1>{slugObject.slug}</h1>
      <h1>{slug}</h1>
      <h1>{slug1}</h1> */}
    </div>
  );
}
export default ProductScreen;
