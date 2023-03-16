import './App.css';
import { Main } from './components/Main';
import { useGlobalContext } from './utils/Context';
import Confetti from 'react-confetti';

function App() {
  const {finishDice} = useGlobalContext();
  return (
    <>
    { finishDice && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    <div className="container-fluid bg-light position-absolute top-50 start-50 translate-middle w-75 h-75 rounded-5 d-flex justify-content-center">
      <Main />
    </div>
    </>
  );
}

export default App;
