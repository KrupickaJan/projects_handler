import "./ProgrammerList.css"

function ProgerammerList({ data, onDelete }) {
  return (
    <div className="list">
      {data.map((item) => {
        return (
          <div className="item" key={item.id}>
            <span>
              {item.name} / {item.level}
            </span>
            <button className="btn-delete" onClick={() => onDelete(item.id)}>
              ×
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default ProgerammerList
