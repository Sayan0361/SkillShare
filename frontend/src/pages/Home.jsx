import React from 'react';
import Header from '../components/Header/Header';
import MainContent from '../components/MainContent/MainContent';
import Footer from '../components/Footer/Footer';

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-[#fcfbf8] overflow-x-hidden"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <Header />

      {/* Main Content grows to fill space */}
      <main >
        <MainContent />
      </main>

      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
};

export default Home;
