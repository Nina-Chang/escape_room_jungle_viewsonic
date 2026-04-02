import './App.css';
import { StartPage } from './pages/StartPage/StartPage';
import { StoryProloguePage } from './pages/StoryProloguePage/StoryProloguePage';
import { GameStartPage } from './pages/GameStartPage/GameStartPage';
import { MapPage } from './pages/MapPage/MapPage';
import { WrongPathPage } from './pages/WrongPathPage/WrongPathPage';
import { TrueFalseQuizPage } from './pages/TrueFalseQuizPage/TrueFalseQuizPage';
import { TrueFalseQuizClearPage } from './pages/TrueFalseQuizClearPage/TrueFalseQuizClearPage';
import { SingleChoiceQuizPage } from './pages/SingleChoiceQuizPage/SingleChoiceQuizPage';
import { SingleChoiceClearPage } from './pages/SingleChoiceClearPage/SingleChoiceClearPage';
import { MultipleChoiceQuizPage } from './pages/MultipleChoiceQuizPage/MultipleChoiceQuizPage';
import { MultipleChoiceClearPage } from './pages/MultipleChoiceClearPage/MultipleChoiceClearPage';
import { GameSuccessPage} from './pages/GameSuccessPage/GameSuccessPage'
import { FinalClueQuizPage } from './pages/FinalClueQuizPage/FinalClueQuizPage';
import { useLayoutEffect,useEffect, useState,useRef } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

const backgroundImage = {
  start:cfg.images.bgStart || './images/background/jungle_escape_room_01_FHD.png',
  prologue: cfg.images.bgPrologue || './images/background/jungle_escape_room_02_FHD.png',
  gameStart:cfg.images.bgGameStart || './images/background/jungle_escape_room_03_FHD.png',
  map:cfg.images.bgMap || './images/background/jungle_escape_room_04_FHD.png',
  wrongPath: cfg.images.bgWrongPath || './images/background/jungle_escape_room_13_FHD.png',
  trueFalseQuiz: cfg.images.bgTrueFalseQuiz || './images/background/jungle_escape_room_05_FHD.png',
  quizClear: cfg.images.bgQuizClear || './images/background/jungle_escape_room_06_FHD.png',
  choiceQuiz: cfg.images.bgChoiceQuiz || './images/background/jungle_escape_room_07_FHD.png',
  finalClueQuiz: cfg.images.bgFinalClueQuiz || './images/background/jungle_escape_room_11_FHD.png',
  gameSuccess: cfg.images.bgGameSuccess || './images/background/jungle_escape_room_12_FHD.png',
}

function App() {
  const [page, setPage] = useState('start');
  const [scale, setScale] = useState(1);
  const [currentStepOnMap,setCurrentStepOnMap]=useState(1)
  const [wrongPathBackTo,setWrongPathBackTo]=useState({page:'map',problemIndex:0})
  const [currentProblemIndex,setCurrentProblemIndex]=useState(0)
  const audioRef=useRef(null)

  const navigateTo = (pageName) => setPage(pageName);

  const gameStyle = { 
    transform: `scale(${scale})`,
  };

  document.querySelectorAll('.questionText').forEach(el => {
    const len = el.innerText.length;

    if (len > 60) {
      el.style.fontSize = '16px';
    } else if (len >35) {
      el.style.fontSize = '22px';
    } else if (len >20) {
      el.style.fontSize = '28px';
    } else if (len >10) {
      el.style.fontSize = '32px';
    } else {
      el.style.fontSize = '36px';
    }
  });

  document.querySelectorAll('.answerText').forEach(el => {
    const len = el.innerText.length;

    if (len > 40) {
      el.style.fontSize = '16px';
    } else if (len >25) {
      el.style.fontSize = '20px';
    } else if (len >18) {
      el.style.fontSize = '24px';
    } else if (len >10) {
      el.style.fontSize = '28px';
    } else {
      el.style.fontSize = '32px';
    }
  });

  const handleStartClick=()=>{
    // 開始遊戲並播放音樂
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.volume = 0.1;
      audioRef.current.loop = true;
      audioRef.current.currentTime = 0; // 從頭開始播放
      audioRef.current.play().catch(error => console.error("背景音樂播放失敗:", error));
    }
    navigateTo('prologue');
  }

  useEffect(() => {
    const startAudioContext = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = 0.1;
        audioRef.current.loop = true;
        audioRef.current.play()
          .then(() => {
            window.removeEventListener('click', startAudioContext);
            window.removeEventListener('touchstart', startAudioContext);
          })
          .catch((error) => {
            console.log("Audio play failed:", error);
          });
      }
    };

    window.addEventListener('click', startAudioContext);
    window.addEventListener('touchstart', startAudioContext);

    return () => {
      window.removeEventListener('click', startAudioContext);
      window.removeEventListener('touchstart', startAudioContext);
    };
  }, []);

  useLayoutEffect(() => {
    // 視窗縮放
    const handleResize = () => {
      if (window.innerWidth === 0) return;
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="game-viewport">
      <div style={gameStyle}>
        {/* 場景1 */}
        {page === 'start' && <StartPage navigateTo={navigateTo} backgroundImage={backgroundImage.start} onStartGame={handleStartClick}/>}
        {/* 場景2 */}
        {page === 'prologue' && <StoryProloguePage navigateTo={navigateTo} backgroundImage={backgroundImage.prologue} />}
        {/* 場景3 */}
        {page === 'gameStart' && <GameStartPage navigateTo={navigateTo} backgroundImage={backgroundImage.gameStart} />}
        {/* 場景4 */}
        {page === 'map' && <MapPage navigateTo={navigateTo} backgroundImage={backgroundImage.map} currentStep={currentStepOnMap} setWrongPathBackTo={setWrongPathBackTo}/>}
        {/* 場景5 */}
        {page === 'wrong path' && <WrongPathPage navigateTo={navigateTo} backgroundImage={backgroundImage.wrongPath} backTo={wrongPathBackTo} setCurrentProblemIndex={setCurrentProblemIndex} />}
        {/* 場景6 */}
        {page === 'true false quiz' && <TrueFalseQuizPage navigateTo={navigateTo} backgroundImage={backgroundImage.trueFalseQuiz} setWrongPathBackTo={setWrongPathBackTo} currentProblemIndex={currentProblemIndex} setCurrentProblemIndex={setCurrentProblemIndex}/>}
        {/* 場景7 */}
        {page === 'true false quiz clear' && <TrueFalseQuizClearPage navigateTo={navigateTo} backgroundImage={backgroundImage.quizClear} setCurrentStepOnMap={setCurrentStepOnMap}/>}
        {/* 場景8 */}
        {page === 'single choice quiz' && <SingleChoiceQuizPage navigateTo={navigateTo} backgroundImage={backgroundImage.choiceQuiz} setWrongPathBackTo={setWrongPathBackTo} currentProblemIndex={currentProblemIndex} setCurrentProblemIndex={setCurrentProblemIndex}/>}
        {/* 場景9 */}
        {page === 'single choice quiz clear' && <SingleChoiceClearPage navigateTo={navigateTo} backgroundImage={backgroundImage.quizClear} setCurrentStepOnMap={setCurrentStepOnMap} bgmAudio={audioRef.current}/>}
        {/* 場景10 */}
        {page === 'multiple choice quiz' && <MultipleChoiceQuizPage navigateTo={navigateTo} backgroundImage={backgroundImage.choiceQuiz} setWrongPathBackTo={setWrongPathBackTo} currentProblemIndex={currentProblemIndex} setCurrentProblemIndex={setCurrentProblemIndex}/>}
        {/* 場景11 */}
        {page === 'multiple choice quiz clear' && <MultipleChoiceClearPage navigateTo={navigateTo} backgroundImage={backgroundImage.quizClear} setCurrentStepOnMap={setCurrentStepOnMap}/>}
        {/* 場景12 */}
        {page === 'final clue quiz' && <FinalClueQuizPage navigateTo={navigateTo} backgroundImage={backgroundImage.finalClueQuiz} setWrongPathBackTo={setWrongPathBackTo} currentProblemIndex={currentProblemIndex} setCurrentProblemIndex={setCurrentProblemIndex}/>}
        {/* 場景13 */}
        {page === 'game success' && <GameSuccessPage navigateTo={navigateTo} backgroundImage={backgroundImage.gameSuccess} bgmAudio={audioRef.current} setCurrentStepOnMap={setCurrentStepOnMap}/>}

        <audio ref={audioRef} src={cfg.sounds.bgm || "./sounds/african-background-music-tribal-kongo-nigeria-tanzania.mp3"} preload="auto" />    
      </div>
    </div>
  );
}

export default App;
