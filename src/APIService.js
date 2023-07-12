const APIService =
{
  createUser(name, bio, location, avatar, email) {
    return fetch("http://localhost:8080/user",
      {
        method: "POST",
        body: JSON.stringify({ "name": name, "bio": bio, "location": location, "avatarUrl": avatar, "email": email }), headers: {
          'Content-Type': 'application/json'
        }
      })
  },

  fetchUser() {
    return fetch(`http://localhost:8080/user/dataFetching?email=${sessionStorage.getItem("email")}`)
      .then(response => response.json())
  },
  async fetchUserOrCreateUser() {
    const fetchdata = await fetch(`http://localhost:8080/user/dataFetching?email=${sessionStorage.getItem("email")}`)
    if (fetchdata.status === 200) {
      const data = await fetchdata.json()
      sessionStorage.setItem("userId", data.id)
      console.log(sessionStorage.userId)
      return true
    }
    return false
  },
  createUser(name, bio, location, avatar, email) {
    fetch("http://localhost:8080/user",
      {
        method: "POST",
        body: JSON.stringify({ "name": name, "bio": bio, "location": location, "avatarUrl": avatar, "email": email }), headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => APIService.fetchUserOrCreateUser())
  },

  createProject(payload) {
    return fetch("http://localhost:8080/project",
      {
        method: "POST",
        body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }
      })
  },
  updateUser(userId, param, payload) {
    return fetch(`http://localhost:8080/user/${userId}/${param}`,
      { method: "PUT", body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
  },

  getAllProject() {
    return fetch("http://localhost:8080/project")
      .then(response => response.json())
  },
  getProjectById(id) {
    return fetch(`http://localhost:8080/project/${id}`)
      .then(response => response.json())
  },
  getProjectsBySearch(searchData){
    return fetch(`http://localhost:8080/project/getData?searchData=${searchData}`)
    .then(response => response.json())
  },
  getUserById(id) {
    return fetch(`http://localhost:8080/user/dataFetching?id=${id}`)
      .then(response => response.json())
  },
  commentProject(projectId, content){
    return fetch(`http://localhost:8080/project/${projectId}?userId=${sessionStorage.getItem('userId')}`,{
      method:"PUT",
      body:content,
      headers:{'Content-Type':'application/json'}
    })
  }

}

module.exports = APIService;