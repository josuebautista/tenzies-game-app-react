export const Element = ({value, id, isHeald, holdDice}) => {

  return (
    <div className={`col-2 shadow-sm border border-2 rounded-4 mx-2 my-3 py-3 btn btn-outline-success text-black ${isHeald && "bg-success"}`} onClick={holdDice}>
      <h1 className="text-center fw-bold">{value}</h1>
    </div>
  )
}