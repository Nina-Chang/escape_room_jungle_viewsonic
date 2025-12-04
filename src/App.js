import { Route, Routes } from 'react-router-dom';
import './App.css';
import { StartPage } from './components/FirstPage';
import { PreviousStoryPage } from './components/PreviousStoryPage';
import { InstructionsPage } from './components/InstructionsPage';
import { MapPage } from './components/MapPage';
import { WrongPlacePage } from './components/WrongPlacePage';
import { TrueFalseItemPage } from './components/TrueFalseItemPage';
import { TrueFalseItemCompletedPage } from './components/TrueFalseItemCompletedPage';
import { SingleSelectionPage } from './components/SingleSelectionPage';
import { SingleSelectionCompletedPage } from './components/SingleSelectionCompletedPage';
import { useEffect, useState } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

const backgroundImage = {
  start:cfg.images.bgStart || '/images/background/jungle_escape_room_01_FHD.png',
  previousStory: cfg.images.bgPreviousStory || '/images/background/jungle_escape_room_02_FHD.png',
  instructions:cfg.images.bgInstructions || '/images/background/jungle_escape_room_03_FHD.png',
  map:cfg.images.bgMap || '/images/background/jungle_escape_room_04_FHD.png',
  wrongPlace: cfg.images.bgWrongPlace || '/images/background/jungle_escape_room_13_FHD.png',
  trueFalseItem: cfg.images.bgTrueFalseItem || '/images/background/jungle_escape_room_05_FHD.png',
  trueFalseItemCompleted: cfg.images.bgTrueFalseItemCompleted || '/images/background/jungle_escape_room_06_FHD.png',
  singleSelection: cfg.images.bgSingleSelection || '/images/background/jungle_escape_room_07_FHD.png',
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
        {page === 'instructions' && <InstructionsPage navigateTo={navigateTo} backgroundImage={backgroundImage.instructions} />}
        {page === 'map' && <MapPage navigateTo={navigateTo} backgroundImage={backgroundImage.map} />}
        {page === 'wrong place' && <WrongPlacePage navigateTo={navigateTo} backgroundImage={backgroundImage.wrongPlace} />}
        {page === 'true false item' && <TrueFalseItemPage navigateTo={navigateTo} backgroundImage={backgroundImage.trueFalseItem} />}
        {page === 'true false completed' && <TrueFalseItemCompletedPage navigateTo={navigateTo} backgroundImage={backgroundImage.trueFalseItemCompleted} />}
        {page === 'single selection' && <SingleSelectionPage navigateTo={navigateTo} backgroundImage={backgroundImage.singleSelection} />}
        {page === 'single selection completed' && <SingleSelectionCompletedPage navigateTo={navigateTo} backgroundImage={backgroundImage.trueFalseItemCompleted} />}
      </div>
    </div>
  );
}

export default App;
