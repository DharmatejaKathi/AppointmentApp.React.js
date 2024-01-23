// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIs} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickStar = () => {
    toggleIs(id)
  }

  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li>
      <div className="starred-container">
        <p>{title}</p>
        <button
          className="star-button"
          type="button"
          onClick={onClickStar}
          data-testid="star"
        >
          <img className="star-img" src={starUrl} alt="star" />
        </button>
      </div>
      <p>Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
