import { Form, Button } from "react-bootstrap";
import "./index.css";

const CartItem = () => {
  return (
    <div className="cartItem">
      <div className="product">
        <div className="productImg">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b" />
        </div>
        <div className="productInfo">
          <h2>test</h2>
          <h3>30 EGP</h3>
          <Button
            variant="secondary"
            style={{ color: "white" }}
            className="mt-auto"
          >
            Remove
          </Button>
        </div>
      </div>

      <div className="cartItemSelection">
        <span className="d-block mb-1">Quantity</span>
        <Form.Select aria-label="Default select example">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default CartItem;
