import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/article" element={<ArticlePage />} />
    </Routes>
  );
}