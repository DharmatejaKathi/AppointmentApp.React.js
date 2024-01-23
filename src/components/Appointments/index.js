// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], titleInput: '', dateInput: '', isFilter: false}

  toggleIs = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onFilter = () => {
    const {isFilter} = this.state

    this.setState({isFilter: !isFilter})
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formatData = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formatData,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilter} = this.state

    if (isFilter) {
      return appointmentList.filter(each => each.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {titleInput, isFilter, dateInput} = this.state
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="container">
        <div className="appointment-container">
          <div className="add-appointment-container">
            <from className="form" onSubmit={this.onAddAppointment}>
              <h1>Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <input
                className="input"
                type="text"
                id="title"
                placeholder="Title"
                value={titleInput}
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date">DATE</label>
              <input
                className="date"
                type="date"
                id="date"
                value={dateInput}
                onChange={this.onChangeDate}
              />
              <button
                className="button"
                type="button"
                onClick={this.onAddAppointment}
              >
                Add
              </button>
            </from>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="starred-container">
            <h1>Appointments</h1>
            <button
              className="starred-button"
              type="button"
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-container">
            {filteredAppointmentList.map(each => (
              <AppointmentItem
                appointmentDetails={each}
                key={each.id}
                toggleIs={this.toggleIs}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
