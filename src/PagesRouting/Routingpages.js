import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main";
import Home from "../Pages/FixedPages/Home/Home";
// import Book1 from "../Pages/FixedPages/Products/BookpdfView/Book1";
// import Book1View1 from "../Pages/FixedPages/Products/BookpdfView/Book1View1";
// import Book3 from "../Pages/FixedPages/Products/BookpdfView/Book3";
// import Book4 from "../Pages/FixedPages/Products/BookpdfView/Book4";
import SignUP from "../PagesSecurity/CreateUser/SignUP";
// import Book5 from "../Pages/FixedPages/Products/BookpdfView/Book5";
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
import PendingOrder from "../Pages/PrivatePages/OrderSummery/Orderpending/PendingOrder";
import Contact from "../Pages/FixedPages/ZwebSpecific/Contact/Contact";
import NotFoundPages from "../Pages/NotFoundPages/NotFoundPages";
import WishList from "../Pages/PrivatePages/DashBoard/WishList/WishList";
import CeategorySetup from "../Pages/PrivatePages/DashBoard/CategorySetup/CeategorySetup";
import Successmassag from "../Pages/FixedPages/Purchages/PaidPurch/Successmassag";
import PaidOrderPlaced from "../Pages/PrivatePages/OrderSummery/PaidOrder/PaidOrderPlaced";
import ConfirmList from "../Pages/PrivatePages/OrderSummery/OrderConfirmation/ConfirmList";
import Completelist from "../Pages/PrivatePages/OrderSummery/OrderConfirmation/Completelist";
import CancelOrder from "../Pages/PrivatePages/OrderSummery/CancelOrder/CancelOrder";
import ImageSlider from "../Pages/PrivatePages/DashBoard/WebMenuSetup/SliderImage/ImageSlider";
import Marqsetup from "../Pages/PrivatePages/DashBoard/WebMenuSetup/SliderImage/Marqsetup";
import AllCategory from "../Pages/PrivatePages/DashBoard/CategorySetup/AllCategory/AllCategory";
import ReviewList from "../Pages/PrivatePages/DashBoard/ReviewList/ReviewList";
import SmWebmenulist from "../Pages/PrivatePages/DashBoard/WebmenuList/SmWebmenulist";
import ReportOrders from "../Pages/PrivatePages/DashBoard/ReportOrders/ReportOrders";
import ProductsFilter from "../Pages/FixedPages/Products/ProductsFilter/ProductsFilter";
import VideoUpload from "../Pages/PrivatePages/DashBoard/WebMenuSetup/VideoSetup/VideoUpload";
import Authoradd from "../Pages/PrivatePages/AuthorAdd/Authoradd";
import AuthorShow from "../Pages/PrivatePages/AuthorAdd/AuthorShow";

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
            path: "/contactus",
            element: <Contact></Contact>
        }
            ,
        {
            path: "/profile",
            element: <Secureroute><Profile></Profile></Secureroute>
        },
        {
            path: '/productsupdate/:id',
            element: <PmUpdate></PmUpdate>,
            loader: ({ params }) => fetch(`${process.env.REACT_APP_backendurl}/products/${params.id}`)
        },
        {
            path: '/products/:id',
            element: <ProductsDetails></ProductsDetails>,
            loader: ({ params }) => fetch(`${process.env.REACT_APP_backendurl}/products/${params.id}`)
        },
        {
            path: "/cartItem",
            element: <CartItem></CartItem>
        },
        {
            path: "/myorder/:email",
            element: <Myorder></Myorder>,
            loader: ({ params }) => fetch(`${process.env.REACT_APP_backendurl}/ordercheck/${params.email}`)
        },
        {
            path: "/wishList/:email",
            element: <Secureroute><WishList></WishList></Secureroute>,
            loader: ({ params }) => fetch(`${process.env.REACT_APP_backendurl}/wishList/${params.email}`)
        },
        {
            path: "/cashOnpurc",
            element: <Secureroute><CashOnpurch></CashOnpurch></Secureroute>,
            // loader:({params})=>fetch(`${process.env.REACT_APP_backendurl}/cashOnpurc/${params.email}`)
        },
        {
            path: "/payment/success/:tranId",
            element: <Successmassag></Successmassag>
        },
        {
            path: "/filterproducts",
            element: <ProductsFilter></ProductsFilter>
        },

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
                path: "/dashboard/addProducts",
                element: <AdminSecurPages><Secureroute><Createdproduct></Createdproduct></Secureroute></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/addProducts",
                element: <SuperAdmin><Secureroute><Createdproduct></Createdproduct></Secureroute></SuperAdmin>
            },
            {
                path: "/dashboard/allusers",
                element: <SuperAdmin><AllUsers></AllUsers></SuperAdmin>
            },
            {
                path: "/dashboard/pendingOrder",
                element: <AdminSecurPages><PendingOrder></PendingOrder></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/pendingOrder",
                element: <SuperAdmin><PendingOrder></PendingOrder></SuperAdmin>
            },
            {
                path: "/dashboard/cancelOrderlist",
                element: <AdminSecurPages><CancelOrder></CancelOrder></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/cancelOrderlist",
                element: <SuperAdmin><CancelOrder></CancelOrder></SuperAdmin>
            },
            {
                path: "/dashboard/allProducts",
                element: <AdminSecurPages><AllProducts></AllProducts></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/allProducts",
                element: <SuperAdmin><AllProducts></AllProducts></SuperAdmin>
            },
            {
                path: "/dashboard/cashonplaced",
                element: <AdminSecurPages><CashonPlaced></CashonPlaced></AdminSecurPages>
                // loader:({params})=>fetch(`${process.env.REACT_APP_backendurl}/dashbaord/cashonplaced/${params.role}`)
            },
            {
                path: "/dashboard/paidorderplaced",
                element: <AdminSecurPages><PaidOrderPlaced></PaidOrderPlaced></AdminSecurPages>
            },
            {
                path: "/dashboard/confirmOrderlist",
                element: <AdminSecurPages><ConfirmList></ConfirmList></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/confirmOrderlist",
                element: <SuperAdmin><ConfirmList></ConfirmList></SuperAdmin>
            },
            {
                path: "/dashboard/completelist",
                element: <AdminSecurPages><Completelist></Completelist></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/completelist",
                element: <SuperAdmin><Completelist></Completelist></SuperAdmin>
            },
            {
                path: "/dashboard/categoryset",
                element: <AdminSecurPages><CeategorySetup></CeategorySetup></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmim/categoryset",
                element: <SuperAdmin><CeategorySetup></CeategorySetup></SuperAdmin>
            },
            {
                path: "/dashboard/sliderimage",
                element: <AdminSecurPages><ImageSlider></ImageSlider></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/sliderimage",
                element: <SuperAdmin><ImageSlider></ImageSlider></SuperAdmin>
            },
            {
                path: "/dashboard/marqsetup",
                element: <AdminSecurPages><Marqsetup></Marqsetup></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/marqsetup",
                element: <SuperAdmin><Marqsetup></Marqsetup></SuperAdmin>
            },
            {
                path: "/dashboard/allcategory",
                element: <AdminSecurPages><AllCategory></AllCategory></AdminSecurPages>,
            },
            {
                path: "/dashboard/superadmin/allcategory",
                element: <SuperAdmin><AllCategory></AllCategory></SuperAdmin>,
            },
            {
                path: "/dashboard/reviewlist",
                element: <AdminSecurPages><ReviewList></ReviewList></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/reviewlist",
                element: <SuperAdmin><ReviewList></ReviewList></SuperAdmin>
            },
            {
                path: "/dashboard/smwebmenulist",
                element: <AdminSecurPages><SmWebmenulist></SmWebmenulist></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/smwebmenulist",
                element: <SuperAdmin><SmWebmenulist></SmWebmenulist></SuperAdmin>
            },
            {
                path: "/dashboard/superadmin/orderreport",
                element: <SuperAdmin><ReportOrders></ReportOrders></SuperAdmin>
            },
            {
                path: "/dashboard/orderreport",
                element: <AdminSecurPages><ReportOrders></ReportOrders></AdminSecurPages>
            },
            {
                path: "/dashboard/videoupload",
                element: <AdminSecurPages><VideoUpload></VideoUpload></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/videoupload",
                element: <SuperAdmin><VideoUpload></VideoUpload></SuperAdmin>
            },
            {
                path: "/dashboard/author",
                element: <AdminSecurPages><Authoradd></Authoradd></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/author",
                element: <SuperAdmin><Authoradd></Authoradd></SuperAdmin>
            },
            {
                path: "/dashboard/showauthor",
                element: <AdminSecurPages><AuthorShow></AuthorShow></AdminSecurPages>
            },
            {
                path: "/dashboard/superadmin/authorshow",
                element: <SuperAdmin><AuthorShow></AuthorShow></SuperAdmin>
            }
        ]
    },

    // {
    //     path: "/abook2",
    //     element: <Secureroute><Book1></Book1></Secureroute>
    // },
    // {
    //     path: "/book1v1",
    //     element: <Book1View1></Book1View1>
    // },
    // {
    //     path: "/book3",
    //     element: <Book3></Book3>
    // },
    // {
    //     path: "/book4",
    //     element: <Book4></Book4>
    // },
    // {
    //     path: "/book5",
    //     element: <Book5></Book5>
    // },

    {
        path: "*",
        element: <NotFoundPages></NotFoundPages>
    }
])

export default router;