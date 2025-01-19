import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main";
import Home from "../Pages/FixedPages/Home/Home";
import Book1 from "../Pages/FixedPages/Products/BookpdfView/Book1";
import Book1View1 from "../Pages/FixedPages/Products/BookpdfView/Book1View1";
import Book3 from "../Pages/FixedPages/Products/BookpdfView/Book3";
import Book4 from "../Pages/FixedPages/Products/BookpdfView/Book4";

const router=createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        children:[{
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/abook2",
            element:<Book1></Book1>
        },
        {
            path:"/book1v1",
            element:<Book1View1></Book1View1>
        },
        {
            path:"/book3",
            element:<Book3></Book3>
        },
        {
            path:"/book4",
            element:<Book4></Book4>
        }
    ]
    }
])

export default router;