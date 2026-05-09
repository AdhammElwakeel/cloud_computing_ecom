import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/Categories/act/hooks";
import { actGetCategories } from "@store/Categories/CategoriesSlice";
import { Container, Alert, Spinner } from "react-bootstrap";
import { Category } from "@components/Ecommerce";
import { Loading } from "@/components/feedback";
import { GridList } from "@/components/common";
import type { TCategory } from "@/types/Category";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, record } = useAppSelector(
    (state) => state.Categories
  );

  useEffect(() => {
    if (!record.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, record]);

  if (loading === "pending") {
    return (
      <Container className="py-5">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
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
          Error loading categories: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Loading status={loading} error={error}>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3" style={{ color: '#2c3e50' }}>
            Explore Our Categories
          </h1>
          <p className="lead text-muted">Discover amazing products across different categories</p>
          <div style={{ width: '60px', height: '4px', background: 'linear-gradient(135deg, #4a90e2, #3867d6)', margin: '20px auto', borderRadius: '2px' }}></div>
        </div>
        <GridList<TCategory> 
          records={record} 
          renderItem={(recordItem) => <Category {...recordItem} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;