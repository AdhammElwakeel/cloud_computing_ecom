import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/store/Categories/act/hooks";
import actGetWishlistItems from "@/store/Wishlist/act/actGetWishlistItems";
import Product from "@/components/Ecommerce/Product/Product";
import type { TProduct } from "@/types/Product";
import axios from "axios";
import "./Wishlist.css";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { itemsId, loading: wishlistLoading } = useAppSelector(
    (state) => state.Wishlist
  );
  const [products, setProducts] = useState<TProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(actGetWishlistItems(1));
  }, [dispatch]);

  useEffect(() => {
    if (itemsId.length > 0) {
      setProductsLoading(true);
      setError(null);
      const concatenatedIds = itemsId.map((id) => `id=${id}`).join("&");
      axios
        .get<TProduct[]>(`/products?${concatenatedIds}`)
        .then((res) => {
          setProducts(res.data);
          setProductsLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Failed to load wishlist products");
          setProductsLoading(false);
        });
    } else {
      setProducts([]);
    }
  }, [itemsId]);

  if (wishlistLoading || productsLoading) {
    return (
      <Container className="py-5">
        <div className="d-flex justify-content-center align-items-center wishlist-loading">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <div className="wishlist-page">
      <Container>
        <div className="wishlist-header">
          <h2 className="wishlist-title">My Wishlist</h2>
          <p className="wishlist-count">
            {itemsId.length} {itemsId.length === 1 ? "item" : "items"}
          </p>
        </div>

        {itemsId.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">&#9825;</div>
            <h3>Your wishlist is empty</h3>
            <p>Browse our categories and add items you love!</p>
          </div>
        ) : (
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product.id} xs={6} md={4} lg={3}>
                <Product {...product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Wishlist;