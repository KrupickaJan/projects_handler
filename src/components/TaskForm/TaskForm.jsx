import "./TaskForm.css"

function TaskForm({ isManageable, onChange, numberOfLinesIn, timeLimitIn }) {
  return (
    <div className="taskFrom">
      <label htmlFor="numberOfLines">lines of code</label>
      <input
        type="number"
        id="numberOfLines"
        name="numberOfLines"
        onChange={onChange}
        min="0"
        value={numberOfLinesIn}
      />
      <label htmlFor="timeLimit">time limit [days]</label>
      <input
        type="number"
        id="timeLimit"
        name="timeLimit"
        onChange={onChange}
        min="0"
        value={timeLimitIn}
      />
      <button
        disabled={!isManageable}
        className={isManageable ? "btn-green" : "btn-red"}
      >
        Do it
      </button>
    </div>
  )
}
export default TaskForm
