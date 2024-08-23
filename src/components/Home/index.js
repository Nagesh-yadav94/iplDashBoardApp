// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    teamsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchData = await response.json()
    const updateFetchData = fetchData.teams.map(eachListData => ({
      name: eachListData.name,
      id: eachListData.id,
      imageUrl: eachListData.team_image_url,
    }))
    this.setState({teamsData: updateFetchData, isLoading: false})
  }

  renderTeamsList = () => {
    const {teamsData} = this.state

    return (
      <ul className="team-list-items">
        {teamsData.map(eachTeam => (
          <TeamCard key={eachTeam.id} teamData={eachTeam} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="ipl-container">
          <div className="header-container">
            <img
              className="ipl-logo"
              alt="ipl logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            />
            <h1 className="header-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home
