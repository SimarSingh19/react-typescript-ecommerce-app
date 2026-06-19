import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Products = lazy(() => import("../pages/Products"));
const Cart = lazy(() => import("../pages/Cart"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));

import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";
import MainLayout from "../components/MainLayout";
import Loader from "../components/Loader";

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/products">
          <Route index element={<Products />} />
          <Route path=":id" element={<ProductDetails />} />
        </Route>

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/admin" element={<RoleProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></RoleProtectedRoute>}/>

        <Route path="/unauthorized" element={<Unauthorized />} />
        
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  );
}

export default AppRoutes;