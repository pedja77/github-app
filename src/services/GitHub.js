import axios from "axios"

const API_TOKEN = "1461f25375db0eb42e62493cca59f65152326554"

axios.defaults.baseURL = "https://api.github.com/users/"
axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`

class GitHub {
  getRepos(username) {
    return axios.get(`/${username}/repos`)
  }
}

export const gitHub = new GitHub()
