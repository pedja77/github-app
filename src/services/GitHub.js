import axios from "axios"

axios.defaults.baseURL = "https://api.github.com/users/"

class GitHub {
  getRepos(username) {
    return axios.get(`/${username}/repos`)
  }
}

export const gitHub = new GitHub()
