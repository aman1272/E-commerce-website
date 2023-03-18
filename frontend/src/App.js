import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductDetails from './components/product/ProductDetails';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import ProtectedRoute from './components/route/ProtectedRoute';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { loadUser } from './actions/userAction';
import store from './store'
import Profile from './components/user/Profile';
import { useSelector } from 'react-redux';
import UpdateProfile from './components/user/UpdateProfile';
function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { error, user, isAuthenticated, loading } = useSelector(state => state.auth);

  return (

    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} exact ></Route>
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />}/>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />}/>
            <Route path="/me" element={isAuthenticated ? <Profile /> : <Login />}/>
            <Route path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <Login />}/>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>

          {/* TODO  to create new ProtectedRoute component and map all the conditional route with them */}
          {/* <ProtectedRoute path="/me" component={Profile} exact />   */}
          {/* <Route path="/me" element={<ProtectedRoute />} /> */}
        </Routes>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
