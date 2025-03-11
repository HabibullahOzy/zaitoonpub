// import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './PagesRouting/Routingpages';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App" style={{ fontFamily: 'Times New Roman, Times, serif', fontStyle: '' }}>

      <Toaster
        position="top-center"
      reverseOrder={false}
      />

      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
