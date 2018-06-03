import axios from "axios"

const API_TOKEN = "4c488d8fa8746a8f2baf9c88620cd1900efcbf13"

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
