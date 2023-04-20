// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointment extends Component {
  state = {
    searchInput: '',
    dateInput: '',
    appointmentsList: [],
    active: false,
  }

  onClickToggleBtn = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppt => {
        if (id === eachAppt.id) {
          return {...eachAppt, isLiked: !eachAppt.isLiked}
        }
        return eachAppt
      }),
    }))
  }

  renderAppointmentsList = () => {
    const {appointmentsList} = this.state
    return appointmentsList.map(each => (
      <AppointmentItem
        appItem={each}
        key={each.id}
        onClickToggleBtn={this.onClickToggleBtn}
      />
    ))
  }

  addAppointment = event => {
    event.preventDefault()
    const {searchInput, dateInput} = this.state

    const newAppointment = {
      id: v4(),
      searchInput,
      dateInput,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      searchInput: '',
      dateInput: '',
      isLiked: false,
    }))
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeText = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickStarred = () => {
    const {appointmentsList, active} = this.state
    this.setState({active: !active})

    const filteredList = appointmentsList.filter(each => each.isLiked === true)
    this.setState({appointmentsList: filteredList})
  }

  render() {
    const {searchInput, dateInput, active} = this.state

    const updatedClassName = active ? 'active' : 'app-button'

    return (
      <div className="container">
        <div className="card">
          <div className="card-container">
            <div>
              <h1 className="head">Add Appointment</h1>
              <form onSubmit={this.addAppointment}>
                <div className="d">
                  <label htmlFor="title" className="t">
                    Title
                  </label>
                  <input
                    type="text"
                    className="text"
                    onChange={this.onChangeText}
                    value={searchInput}
                    id="title"
                    placeholder="Title"
                  />
                </div>

                <div className="d">
                  <label htmlFor="date" className="t">
                    Date
                  </label>
                  <input
                    type="date"
                    onChange={this.onChangeDate}
                    value={dateInput}
                    id="date"
                    className="date"
                  />
                </div>

                <button type="submit" className="btn">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img2"
            />
          </div>
          <hr className="line" />
          <div className="result">
            <h1 className="app">Appointments</h1>
            <button
              type="button"
              className={updatedClassName}
              onClick={this.onClickStarred}
            >
              starred
            </button>
          </div>
          <ul className="app-list">{this.renderAppointmentsList()}</ul>
        </div>
      </div>
    )
  }
}
export default Appointment
