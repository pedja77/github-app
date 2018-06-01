import axios from "axios"

const API_TOKEN = "689962f69703237f6dc87ffbd8ed14b4bf1399f4"

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
