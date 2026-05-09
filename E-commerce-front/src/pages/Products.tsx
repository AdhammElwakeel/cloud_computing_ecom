import { useAppDispatch, useAppSelector } from "@/store/Categories/act/hooks";
import { actGetProductsByCatPrefix, productsCleanUp } from "@/store/Products/ProductsSlice";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Product } from "@/components/Ecommerce";
import { Loading } from "@/components/feedback";
import { GridList } from "@/components/common";
import type { TProduct } from "@/types/Product";

const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.Products);

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);

  return (
    <Container>
      <Loading status={loading} error={error}>
       <GridList<TProduct> records={records} renderItem={(record) => <Product {...record} />} />
      </Loading>
    </Container>
  );
};

export default Products;