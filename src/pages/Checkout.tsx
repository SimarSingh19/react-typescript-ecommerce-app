import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useCart from "../hooks/useCart";
import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextarea";
import FormSelect from "../components/FormSelect";

const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
  address: z
    .string()
    .trim()
    .min(1, "Address is required"),
  city: z
    .string()
    .trim()
    .min(1, "City is required"),
  pincode: z
    .string()
    .trim()
    .min(1, "Pincode is required")
    .regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
  paymentMethod: z
  .string()
  .min(1, "Please select payment method")
  .refine((value) => ["cod", "card", "upi"].includes(value),"Invalid payment method"),
});

const paymentOptions = [
  {
    label: "Cash on Delivery",
    value: "cod",
  },
  {
    label: "Card",
    value: "card",
  },
  {
    label: "UPI",
    value: "upi",
  },
];

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

function Checkout() {
  const navigate = useNavigate();
  const { items, cartCount, cartTotal, isCartEmpty, clearAllItems } = useCart();

const {
  register, handleSubmit, watch, reset, setValue,
  formState: { errors, isSubmitting, isValid } } = useForm<CheckoutFormValues>({
  resolver: zodResolver(checkoutSchema),
  mode: "onChange",
  defaultValues: {fullName: "",phone: "",address: "",city: "",pincode: "",paymentMethod: ""},
});

const onSubmit = (data: CheckoutFormValues) => {
    // console.log("Checkout Data:", data);  
    const order = {
      customer: data,
      items,
      totalItems: cartCount,
      totalAmount: cartTotal.toFixed(2),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    clearAllItems();
    reset();

    sessionStorage.setItem("orderSuccess", "true");

    navigate("/order-success");
  };

  const fillDemoAddress = () => {
    setValue("fullName", "Simar Singh", {
      shouldValidate: true,
    });

    setValue("phone", "9876543210", {
      shouldValidate: true,
    });

    setValue("address", "Bhanwarkua, Indore", {
      shouldValidate: true,
    });

    setValue("city", "Indore", {
      shouldValidate: true,
    });

    setValue("pincode", "452001", {
      shouldValidate: true,
    });

    setValue("paymentMethod", "cod", {
      shouldValidate: true,
    });
  };

  if (isCartEmpty) {
    return (
      <>
        <div className="checkout_page">
          <div className="app_container">
            <div className="empty_cart app_card">
              <h2><i className="fa-solid fa-cart-shopping"></i> Cart is empty</h2>
               <p>You need to add products before checkout.</p>
              <button className="app_btn app_btn_primary" onClick={() => navigate("/products")} >
                 <i className="fa-solid fa-box"></i> Browse Products
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
       <div className="checkout_page">
        <div className="app_container">
          <h1 className="app_page_title">Checkout</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="checkout_layout">
                  <div className="checkout_items app_card">
                    <h2>Order Summary</h2>

                    {items.map((item) => (
                      <div className="checkout_item" key={item.id}>
                        <img src={item.thumbnail} alt={item.title} className="checkout_item_img" />
                        <div>
                          <h3>{item.title}</h3>
                          <p>₹{item.price} × {item.quantity}</p>
                        </div>
                        <strong>₹{item.price * item.quantity}</strong>
                      </div>
                    ))}
                  </div>

                    <div className="checkout_form app_card">
                      <h2>Delivery Details</h2>
                      <button type="button" className="app_btn app_btn_light" onClick={fillDemoAddress}>Fill Demo</button>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <FormInput
                            label="Full Name"
                            registration={register("fullName")}
                            error={errors.fullName}
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="col-md-6">
                          <FormInput
                            label="Phone"
                            registration={register("phone")}
                            error={errors.phone}
                            maxLength={10}
                            placeholder="9876543210"
                          />
                        </div>

                        <div className="col-12">
                          <FormTextarea
                            label="Address"
                            registration={register("address")}
                            error={errors.address}
                            rows={3}
                          />
                        </div>

                        <div className="col-md-6">
                          <FormInput
                            label="City"
                            registration={register("city")}
                            error={errors.city}
                          />
                        </div>

                        <div className="col-md-6">
                          <FormInput
                            label="Pincode"
                            registration={register("pincode")}
                            error={errors.pincode}
                            maxLength={6}
                          />
                        </div>

                        <div className="col-12">
                          <FormSelect
                            label="Payment Method"
                            registration={register("paymentMethod")}
                            error={errors.paymentMethod}
                            options={paymentOptions}
                            placeholder="Select Payment Method"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="checkout_summary app_card">
                      <h2>Payment Summary</h2>
                      <div className="cart_summary_row">
                        <span>Total Items</span>
                        <strong>{cartCount}</strong>
                      </div>

                      <div className="cart_summary_row">
                        <span>Total Amount</span>
                        <strong>₹{cartTotal.toFixed(2)}</strong>
                      </div>

                      <div className="cart_summary_row">
                      <span>Payment</span>
                      <strong className="text-uppercase">
                        {watch("paymentMethod") || "Not selected"}
                      </strong>
                    </div>

                      <button type="submit" className="app_btn app_btn_primary checkout_summary_btn"
                       disabled={isSubmitting}>
                        {isSubmitting ? "Placing Order..." : "Place Order"}
                      </button>

                      <button type="button" className="app_btn app_btn_light checkout_summary_btn"
                        onClick={() => navigate("/cart")}>Back to Cart</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;