import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/article" element={<ArticlePage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}