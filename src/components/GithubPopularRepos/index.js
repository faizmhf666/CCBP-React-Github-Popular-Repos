import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    activeId: 'ALL',
    RepoList: [],
    apiStatus: '',
    languageSelected: 'ALL',
  }

  componentDidMount() {
    this.getRepoList()
  }

  getRepoList = async () => {
    const {languageSelected} = this.state
    this.setState({apiStatus: apiStatusConstant.loading})
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${languageSelected}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(githubReposApiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        popularRepos: data.popular_repos,
      }
      const updatedList = updatedData.popularRepos.map(each => ({
        name: each.name,
        repoId: each.id,
        issuesCount: each.issues_count,
        forks: each.forks_count,
        stars: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      console.log(updatedList)
      this.setState({
        RepoList: updatedList,
        apiStatus: apiStatusConstant.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onFilterList = id => {
    this.setState({activeId: id}, this.getLanguage)
  }

  getLanguage = () => {
    const {activeId} = this.state
    const selectedBtn = languageFiltersData.find(each => each.id === activeId)
    const activeLanguage = selectedBtn.language
    this.setState({languageSelected: activeLanguage}, this.getRepoList)
  }

  renderLanguageButton = () => {
    const {activeId} = this.state
    return (
      <ul>
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            optionsList={each}
            key={each.id}
            onFilterList={this.onFilterList}
            isActive={each.id === activeId}
          />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderListItems = () => {
    const {RepoList} = this.state
    return (
      <ul>
        {RepoList.map(each => (
          <RepositoryItem repoItems={each} key={each.repoId} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  returnItemRender = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderListItems()
      case apiStatusConstant.failure:
        return this.renderFailure()
      case apiStatusConstant.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>Popular</h1>
          {this.renderLanguageButton()}
        </div>

        <div>{this.returnItemRender()}</div>
      </div>
    )
  }
}
export default GithubPopularRepos
