import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const UserProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/products/user/products",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Fetched products:", res.data);
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Unexpected data format:", res.data);
          setProducts([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user products:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, []);

  return (
    <Container>
      {products.length === 0 ? (
        <div>No products found</div>
      ) : (
        products.map((item) => <Product key={item._id} item={item} />)
      )}
    </Container>
  );
};

export default UserProductList;
