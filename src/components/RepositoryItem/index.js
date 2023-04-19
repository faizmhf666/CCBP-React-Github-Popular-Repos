const RepositoryItem = props => {
  const {repoItems} = props
  const {name, issuesCount, forks, stars, avatarUrl} = repoItems
  return (
    <li>
      <img src={avatarUrl} alt={name} />
      <h1>{name}</h1>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />

        <p>{`${stars} stars`}</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{`${forks} forks`}</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{`${issuesCount} issues`}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
