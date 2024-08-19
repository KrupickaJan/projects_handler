import "./ProgrammerForm.css"

function ProgrammerForm({ data, valid, onChange, onAdd }) {
  return (
    <div className="add-form">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        placeholder="name"
        name="name"
        onChange={onChange}
        value={data.name}
      />
      <label htmlFor="radio-junior">Junior</label>
      <input
        type="radio"
        name="level"
        id="radio-junior"
        onChange={onChange}
        value="Junior"
        checked={"Junior" === data.level}
      />
      <label htmlFor="radio-senior">Senior</label>
      <input
        type="radio"
        name="level"
        id="radio-senior"
        onChange={onChange}
        value="Senior"
        checked={"Senior" === data.level}
      />
      <button disabled={!valid} onClick={onAdd}>
        Add
      </button>
    </div>
  )
}

export default ProgrammerForm
