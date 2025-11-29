import { Route, Routes } from 'react-router-dom';
import './App.css';
import { StartPage } from './components/FirstPage';
import { PreviousStoryPage } from './components/PreviousStoryPage';
import { InstructionsPage } from './components/InstructionsPage';
import { useEffect, useState } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

const backgroundImage = {
  start:cfg.images.bgStart || '/images/background/jungle_escape_room_01_FHD.png',
  previousStory: cfg.images.bgPreviousStory || '/images/background/jungle_escape_room_02_FHD.png',
}

function App() {
  const [page, setPage] = useState('start');
  const [scale, setScale] = useState(1);

  const navigateTo = (pageName) => setPage(pageName);

  const gameStyle = { 
    transform: `scale(${scale})`,
  };

  useEffect(() => {
    // 視窗縮放
    const handleResize = () => {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      setScale(Math.min(scaleX, scaleY));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="game-viewport">
      <div style={gameStyle}>
        {page === 'start' && <StartPage navigateTo={navigateTo} backgroundImage={backgroundImage.start} />}
        {page === 'previousStory' && <PreviousStoryPage navigateTo={navigateTo} backgroundImage={backgroundImage.previousStory} />}
        {page === 'instructions' && <InstructionsPage navigateTo={navigateTo} backgroundImage={backgroundImage.start} />}
      </div>
    </div>
  );
}

export default App;
