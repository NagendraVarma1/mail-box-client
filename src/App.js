import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './Components/RootLayout';
import Signup from './Components/Signup';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {path: '/', element: <Signup />}
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
