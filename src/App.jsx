import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import DemoNotice from './components/DemoNotice.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Latest from './pages/Latest.jsx';
import Category from './pages/Category.jsx';
import Article from './pages/Article.jsx';
import Search from './pages/Search.jsx';
import About from './pages/About.jsx';
import Saved from './pages/Saved.jsx';
import Subscribe from './pages/Subscribe.jsx';
import NotFound from './pages/NotFound.jsx';

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 1200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setVisible(false), [pathname]);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-30 hidden h-11 w-11 items-center justify-center border border-rule-strong bg-paper text-ink shadow-card transition-colors hover:border-ink hover:text-accent sm:flex"
    >
      <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 15V1M2 6l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <ScrollToTop />
      <DemoNotice />
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/section/:slug" element={<Category />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BackToTop />
      <Footer />
    </div>
  );
}
