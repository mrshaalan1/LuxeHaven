import mongoose, { Document, Schema } from "mongoose";

const CartItemSchema = new Schema({
  menuItemId: {
    type: Schema.Types.ObjectId,
    ref: "Menu", 
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [CartItemSchema],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.models.cart || mongoose.model("cart", CartSchema);

export default Cart;
