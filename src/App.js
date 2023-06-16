import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './Components/RootLayout';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import ComposeMail from './Components/ComposeMail';
import MailOpen from './Components/MailOpen';
import SentBox from './Components/SentBox';

function App() {

  const token = localStorage.getItem('token')

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {path: '/', element: token ? <Home/> : <Signup />},
        {path: '/login', element: <Login />},
        {path: '/home', element: token ? <Home /> : <Login />},
        {path: '/composeMail', element: token ? <ComposeMail /> : <Login />},
        {path: '/openMail', element: token ? <MailOpen /> : <Login />},
        {path: '/sentbox', element: token ? <SentBox /> : <Login />}
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
