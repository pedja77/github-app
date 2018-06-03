import axios from "axios"

const API_TOKEN = "1f33561930bfaf9a2b0bb13593aaff400c705d4a"

class GitHub {
  constructor() {
    axios.defaults.baseURL = "https://api.github.com/users/"
    axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`
  }
  getRepos(username) {
    return axios.get(`/${username}/repos`)
  }
  getUserData(username) {
    return axios.get(`/${username}`)
  }
}

export const gitHub = new GitHub()
