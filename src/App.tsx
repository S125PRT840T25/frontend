import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AboutUsPage, LoginPage, UploadFeedbackPage } from './pages';
import { PageLayout } from '@layouts';

function App() {
  return (
    <Routes>        
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PageLayout />}>
        <Route index element={<UploadFeedbackPage />} />
        <Route path="upload-feedback" element={<UploadFeedbackPage />} /> 
        <Route path="about-us" element={<AboutUsPage />} />        
      </Route>
    </Routes>
  );
}

export default App;
