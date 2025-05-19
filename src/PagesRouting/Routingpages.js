import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main";
import Home from "../Pages/FixedPages/Home/Home";
import Book1 from "../Pages/FixedPages/Products/BookpdfView/Book1";
import Book1View1 from "../Pages/FixedPages/Products/BookpdfView/Book1View1";
import Book3 from "../Pages/FixedPages/Products/BookpdfView/Book3";
import Book4 from "../Pages/FixedPages/Products/BookpdfView/Book4";
import SignUP from "../PagesSecurity/CreateUser/SignUP";
import Book5 from "../Pages/FixedPages/Products/BookpdfView/Book5";
import SignIn from "../PagesSecurity/SignIn/SignIn";
import Createdproduct from "../Pages/PrivatePages/ProductCreate/Createdproduct";
import Profile from "../Pages/FixedPages/Profiles/Profile";
import Secureroute from "../Pages/PrivatePages/PrivateRouting/Secureroute/Secureroute";
import DashLayOut from "../Pages/PrivatePages/DashBoard/DashLayout/DashLayOut";
import DashBody from "../Pages/PrivatePages/DashBoard/DashBody/DashBody";
import AllUsers from "../Pages/PrivatePages/AdminUsersControl/AllUsers/AllUsers";
import AllProducts from "../Pages/PrivatePages/AllProducts/AllProducts";
import CartItem from "../Pages/FixedPages/CartItems/CartItem";
import ProductsDetails from "../Pages/FixedPages/Products/ProductsDetails/ProductsDetails";
import AdminSecurPages from "../Pages/PrivatePages/PrivateRouting/AdminSecurity/AdminSecurPages";
import SuperAdmin from "../Pages/PrivatePages/PrivateRouting/SuperAdminPage/SuperAdmin";
import CashOnpurch from "../Pages/FixedPages/Purchages/CashOnpurch";
import CashonPlaced from "../Pages/PrivatePages/OrderSummery/CashonPlaced/CashonPlaced";
import Myorder from "../Pages/PrivatePages/DashBoard/Myorder/Myorder";
import PmUpdate from "../Pages/PrivatePages/AllProducts/ProductUpdateModal/PmUpdate";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [{
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/signUp",
            element: <SignUP></SignUP>
        },
        {
            path: "/signIn",
            element: <SignIn></SignIn>
        },
        {
            path: "/profile",
            element: <Secureroute><Profile></Profile></Secureroute>
        },
         {
            path:'/productsupdate/:id',
            element:<PmUpdate></PmUpdate>,
            loader:({params})=>fetch(`http://localhost:5000/products/${params.id}`)
        },
        {
            path:'/products/:id',
            element:<ProductsDetails></ProductsDetails>,
            loader:({params})=>fetch(`http://localhost:5000/products/${params.id}`)
        },
        {
            path: "/cartItem",
            element:<Secureroute><CartItem></CartItem></Secureroute>
        },
        {
            path: "/cashOnpurc",
            element:<Secureroute><CashOnpurch></CashOnpurch></Secureroute>,
            // loader:({params})=>fetch(`http://localhost:5000/cashOnpurc/${params.email}`)
        }
       
        ]
    },
    {
        path: "/dashboard",
        element: <Secureroute><DashLayOut></DashLayOut></Secureroute>,
        children: [
            {
                path: "/dashboard/",
                element: <Secureroute><DashBody></DashBody></Secureroute>
            },
            {
                path: "/dashboard/myorder/:email",
                element:<Secureroute><Myorder></Myorder></Secureroute>,
                loader:({params})=>fetch(`http://localhost:5000/ordercheck/${params.email}`)
            },
            {
                path: "/dashboard/addProducts",
                element: <AdminSecurPages><Secureroute><Createdproduct></Createdproduct></Secureroute></AdminSecurPages>
            },
            {
                path:"/dashboard/allusers",
                element:<SuperAdmin><AllUsers></AllUsers></SuperAdmin>
            },
            {
                path: "/dashboard/allProducts",
                element: <AdminSecurPages><AllProducts></AllProducts></AdminSecurPages>
            },
            {
                path: "/dashboard/cashonplaced",
                element:<AdminSecurPages><CashonPlaced></CashonPlaced></AdminSecurPages>
                // loader:({params})=>fetch(`http://localhost:5000/dashbaord/cashonplaced/${params.role}`)
            }
        ]
    },

    {
        path: "/abook2",
        element: <Secureroute><Book1></Book1></Secureroute>
    },
    {
        path: "/book1v1",
        element: <Book1View1></Book1View1>
    },
    {
        path: "/book3",
        element: <Book3></Book3>
    },
    {
        path: "/book4",
        element: <Book4></Book4>
    },
    {
        path: "/book5",
        element: <Book5></Book5>
    },
])

export default router;