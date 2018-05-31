import axios from "axios"

const API_TOKEN = "3cce5c38bca43af5fc3886c1b0cfbcc8d4fc6d9c"

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
