import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <AppRoutes />
            </main>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
