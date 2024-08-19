function Toggler({ onChoose, active }) {
  const handleCLick = (e) => {
    onChoose(e.target.name)
  }

  return (
    <div className="page-toggler">
      <button
        className={`toggler-btn ${active === 1 && "active"}`}
        name="list-of-programmers"
        onClick={handleCLick}
      >
        List of Programmers
      </button>
      <button
        className={`toggler-btn ${active === 1 && "active"}`}
        name="task-form"
        onClick={handleCLick}
      >
        Form for planning tasks
      </button>
    </div>
  )
}

export default Toggler
