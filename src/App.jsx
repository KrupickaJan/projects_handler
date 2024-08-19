import { useEffect, useState } from "react"
import "./App.css"
import PageContainer from "./components/PageContainer/PageContainer"
import ProgrammerLis from "./components/ProgrammerList/ProgrammerList"
import ProgrammerForm from "./components/ProgrammerForm/ProgrammerForm"
import Toogler from "./components/Toggler/Toggler"
import TaskForm from "./components/TaskForm/TaskForm"
import RawData from "./RawData.json"

function App() {
  const [listOfProgrammers, setListOfProgrammers] = useState(
    RawData.programmers
  )
  const [newProgrammer, setNewProgrammer] = useState({
    id:
      listOfProgrammers.length > 0
        ? Math.max(...listOfProgrammers.map((programmer) => programmer.id)) + 1
        : 1,
    name: "",
    level: "",
  })
  const [valid, setValid] = useState(false)
  const [activeTab, setActiveTab] = useState(1)
  const [isManageable, setIsManageable] = useState(false)
  const [timeLimit, setTimeLimit] = useState()
  const [requiredNumberOfLines, setRequiredNumberOfLines] = useState()
  const [totalLinesPerDay, setTotalLinesPerDay] = useState(
    listOfProgrammers.filter((programmer) => programmer.level !== "Senior")
      .length *
      100 +
      listOfProgrammers.filter((programmer) => programmer.level !== "Junior")
        .length *
        200
  )

  const handleChoose = (name) => {
    switch (name) {
      case "list-of-programmers": {
        setActiveTab(1)
        break
      }
      case "task-form": {
        setActiveTab(2)
        break
      }
      default:
        break
    }
  }

  const handleDelete = (idToDel) => {
    const temp = listOfProgrammers.filter(
      (programmer) => programmer.id !== idToDel
    )
    setListOfProgrammers(temp)
  }

  const validateData = (programmer) => {
    if (programmer.name.trim().length === 0 || programmer.level === "") {
      setValid(false)
    } else {
      setValid(true)
    }
  }

  const handleProgrammerFormChange = (e) => {
    const source = e.target.name
    const val = e.target.value
    let updatedProgramer
    switch (source) {
      case "name": {
        updatedProgramer = { ...newProgrammer, name: val }
        break
      }
      case "level": {
        updatedProgramer = { ...newProgrammer, level: val }
        break
      }
      default:
        break
    }
    setNewProgrammer(updatedProgramer)
    validateData(updatedProgramer)
  }

  const handleTaskFormChange = (e) => {
    const source = e.target.name
    const val = e.target.value

    switch (source) {
      case "numberOfLines": {
        if (parseInt(val) < 1) {
          setRequiredNumberOfLines("")
        } else {
          setRequiredNumberOfLines(val)
        }
        break
      }
      case "timeLimit": {
        if (parseInt(val) < 1) {
          setTimeLimit("")
        } else {
          setTimeLimit(val)
        }
        break
      }
      default:
        break
    }
  }

  const handleAdd = () => {
    setListOfProgrammers((listOfProgrammers) => {
      return [...listOfProgrammers, newProgrammer]
    })
    const updatedProgramer = {
      id: newProgrammer.id + 1,
      name: "",
      level: "",
    }
    setNewProgrammer(updatedProgramer)
    validateData(updatedProgramer)
  }

  useEffect(() => {
    if (requiredNumberOfLines > 0 && timeLimit > 0) {
      setIsManageable(totalLinesPerDay >= requiredNumberOfLines / timeLimit)
    } else {
      setIsManageable(false)
    }
  }, [requiredNumberOfLines, timeLimit, totalLinesPerDay])

  useEffect(() => {
    setTotalLinesPerDay(
      listOfProgrammers.filter((programmer) => programmer.level !== "Senior")
        .length *
        100 +
        listOfProgrammers.filter((programmer) => programmer.level !== "Junior")
          .length *
          200
    )
  }, [listOfProgrammers])

  return (
    <PageContainer>
      <h1>Your app for handling projects</h1>
      <h2>Toggle view</h2>
      <Toogler onChoose={handleChoose} active={activeTab} />
      {activeTab === 1 && (
        <>
          <h2>Your team</h2>
          <ProgrammerLis data={listOfProgrammers} onDelete={handleDelete} />
          <ProgrammerForm
            valid={valid}
            onChange={handleProgrammerFormChange}
            onAdd={handleAdd}
            data={newProgrammer}
          />
        </>
      )}
      {activeTab === 2 && (
        <>
          <h2>Your task</h2>
          <TaskForm
            isManageable={isManageable}
            onChange={handleTaskFormChange}
            numberOfLinesIn={requiredNumberOfLines}
            timeLimitIn={timeLimit}
          />
        </>
      )}
    </PageContainer>
  )
}

export default App
