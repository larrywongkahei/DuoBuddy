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
  async fetchUserOrCreateUser(email) {
    const fetchdata = await fetch(`http://localhost:8080/user/dataFetching?email=${email}`)
    if (fetchdata.status === 200) {
      const data = await fetchdata.json()
      sessionStorage.setItem("userId", data.id)
      window.location.href = "http://localhost:3000"
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
      .then(() => window.location.href = "http://localhost:3000")
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
    return fetch(`http://localhost:8080/project/getSearchResult?searchData=${searchData}`)
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
  },
  async FetchDataFromGoogle(token){
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", 
    {
      method:"GET",
      headers:{"Authorization":"Bearer" + token}
    })
    const data = await response.json();
    sessionStorage.setItem("name", data.name);
    sessionStorage.setItem("avatar_url", "https://larrywongkahei.github.io/img/pixel_art.png");
    sessionStorage.setItem("email", data.email);
    const userExist = await APIService.fetchUserOrCreateUser()
    if(userExist === false){
      await this.createUser(data.name, null, data.locale, "https://larrywongkahei.github.io/img/pixel_art.png", data.email);
    }
    window.location.href = "http://localhost:3000"
},
async FetchDataFromGithub(code){
  const response = await fetch(`http://localhost:8080/login/github/code?code=${code}`)
  const data = await response.json()
  sessionStorage.setItem("name", data.login);
  sessionStorage.setItem("bio", data.bio)
  sessionStorage.setItem("location", data.location)
  sessionStorage.setItem("avatar_url", data.avatar_url);
  sessionStorage.setItem("email", data.email);
  const userExist = await this.fetchUserOrCreateUser(data.email)
  if(userExist === false){
    await this.createUser(data.login, data.bio, data.location, data.avatar_url, data.email)
  }
}


}

module.exports = APIService;