import './index.css'

const LanguageFilterItem = props => {
  const {optionsList, onFilterList, isActive} = props

  const {language, id} = optionsList

  const onClickFilter = () => {
    onFilterList(id)
  }

  const activeClass = isActive ? 'active-btn' : 'inactive-btn'

  return (
    <li className="li-container">
      <button
        type="button"
        className={`button ${activeClass}`}
        onClick={onClickFilter}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
