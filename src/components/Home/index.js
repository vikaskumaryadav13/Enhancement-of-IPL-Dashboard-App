// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    teamsList: [],
  }

  componentDidMount() {
    this.getTeams()
  }

  // GETTING ALL THE TEAMS
  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(eachTeam => ({
      name: eachTeam.name,
      id: eachTeam.id,
      teamImageURL: eachTeam.team_image_url,
    }))
    this.setState({teamsList: updatedData, isLoading: false})
  }

  // RENDERING TEAMS FROM TEAMCARD
  renderingTeams = () => {
    const {teamsList} = this.state
    return (
      <ul className="teams-list">
        {teamsList.map(eachTeam => (
          <TeamCard teamData={eachTeam} key={eachTeam.id} />
        ))}
      </ul>
    )
  }

  // LOADER
  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-route-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderingTeams()}
        </div>
      </div>
    )
  }
}

export default Home
