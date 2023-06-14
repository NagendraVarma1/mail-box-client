import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './Components/RootLayout';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import ComposeMail from './Components/ComposeMail';

function App() {

  const token = localStorage.getItem('token')

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {path: '/', element: <Signup />},
        {path: '/login', element: <Login />},
        {path: '/home', element: token ? <Home /> : <Login />},
        {path: '/composeMail', element: token ? <ComposeMail /> : <Login />}
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
