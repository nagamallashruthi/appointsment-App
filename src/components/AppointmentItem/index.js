// Write your code here

import './index.css'

import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appItem, onClickToggleBtn} = props
  const {searchInput, dateInput, isLiked, id} = appItem

  const ImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickLikeButton = () => {
    onClickToggleBtn(id)
  }

  const dateFormat = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')

  return (
    <li className="li">
      <div className="item-cart">
        <div>
          <p className="para">{searchInput}</p>
          <p className="para1">{`Date:${dateFormat}`}</p>
        </div>
        <button
          type="button"
          className="bt"
          onClick={onClickLikeButton}
          data-testid="star"
        >
          <img src={ImageUrl} className="star" alt="star" />
        </button>
      </div>
    </li>
  )
}
export default AppointmentItem
