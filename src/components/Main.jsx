import { useGlobalContext } from "../utils/Context"
import { Element } from "./Element";

export const Main = () => {
  const { numbers, rollArrayNumbers, holdDice, finishDice, resetGame, count } = useGlobalContext();
  return (
    <div className="position-absolute top-50 start-50 translate-middle overflow-hidden w-100 ms-2">
      <div className="row w-100 text-center d-flex justify-content-center">
        <div className="col-10 py-3">
          {
            finishDice ?
              <>
              <h2 className="py-2">{count}</h2>
              <h1>Congratulations You Won!</h1>
              </>
            :
              <div>
                <h2 className="py2">{count}</h2>
                <h1>Tenzies</h1>
                <p className="fs-4">Roll until all dice are the same. Click each die to freeze it at its current value betweeen rolls.</p>
              </div>
          }
        </div>
      </div>
      <div className="row w-100 d-flex justify-content-center">
        {
          numbers.map((number) => {
            return (
              <Element
                key={number.id}
                value={number.value}
                id={number.id}
                isHeald={number.isHeald}
                holdDice={() => holdDice(number.id)}
              />
            )
          })
        }
      </div>
      <div className="row w-100 d-flex justify-content-center py-3">
        <div className="col-3">
          {
            finishDice ?
              <button className="btn btn-primary fs-1 w-100 rounded-4" onClick={resetGame}>New Game</button>
              :
              <button className="btn btn-primary fs-1 w-100 rounded-4" onClick={rollArrayNumbers}>Roll</button>

          }
        </div>
      </div>
    </div>
  )
}