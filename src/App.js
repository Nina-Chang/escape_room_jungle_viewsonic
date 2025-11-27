import { Route, Routes } from 'react-router-dom';
import './App.css';
import { StartPage } from './component/startPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<StartPage/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
