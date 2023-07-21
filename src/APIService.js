const APIService =
{
  // Add user to database
  createUser(name, bio, location, avatar, email, password) {
    return fetch("http://localhost:8080/user",
      {
        method: "POST",
        body: JSON.stringify({ "name": name, "bio": bio, "location": location, "avatarUrl": avatar, "email": email, "password": password}), headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(data => sessionStorage.setItem("userId", data.id))
      .then(() => window.location.href = "http://localhost:3000")
  },

  // Handle signup
  async signup(name, email, password){
    sessionStorage.setItem("name", name)
    sessionStorage.setItem("email", email)
    sessionStorage.setItem("avatar_url", "https://larrywongkahei.github.io/img/pixel_art.png")
    this.createUser(name, null, null, "https://larrywongkahei.github.io/img/pixel_art.png", email, password)
  },

  async signin(email, password){
    const fetchdata = await fetch("http://localhost:8080/login",{
      method:"POST",
      body:JSON.stringify({
        "email" : email,
        "password" : password
      }), headers:{'Content-Type': 'application/json'}
    })
    if (fetchdata.status !== 200){
      return alert("Wrong detail")
    }
    const data = await fetchdata.json()
    sessionStorage.setItem("name", data.name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("avatar_url", "https://larrywongkahei.github.io/img/pixel_art.png")
    sessionStorage.setItem("userId", data.id)
    return window.location.href = "http://localhost:3000"
  },

  // Used when user has logged in and reload page
  fetchUser() {
    return fetch(`http://localhost:8080/user/dataFetching?email=${sessionStorage.getItem("email")}`)
      .then(response => response.json())
  },

  // Check if user in the database, if not, Create user
  async fetchUserOrCreateUser(name, bio, location, avatar_url, email, password) {
    const fetchdata = await fetch(`http://localhost:8080/user/dataFetching?email=${email}`)
    if (fetchdata.status === 200) {
      const data = await fetchdata.json()
      sessionStorage.setItem("userId", data.id)
      window.location.href = "http://localhost:3000"
    }
    else{
      this.createUser(name, bio, location, avatar_url, email, password)
    }
  },

  // Post project to database
  createProject(payload) {
    return fetch("http://localhost:8080/project",
      {
        method: "POST",
        body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }
      })
  },

  // Update user detail, input bio, location or projects in param field
  // for project, input project id into the body
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
  // searchData could be tags or title
  getProjectsBySearch(searchData) {
    return fetch(`http://localhost:8080/project/getSearchResult?searchData=${searchData}`)
      .then(response => response.json())
  },
  getUserById(id) {
    return fetch(`http://localhost:8080/user/dataFetching?id=${id}`)
      .then(response => response.json())
  },

  // Add comment to project
  commentProject(projectId, content) {
    return fetch(`http://localhost:8080/project/${projectId}?userId=${sessionStorage.getItem('userId')}`, {
      method: "PUT",
      body: content,
      headers: { 'Content-Type': 'application/json' }
    })
  },

  // Fetch data from google oauth api
  async FetchDataFromGoogle(token) {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: "GET",
        headers: { "Authorization": "Bearer" + token }
      })
    const data = await response.json();
    sessionStorage.setItem("name", data.name);
    sessionStorage.setItem("avatar_url", "https://larrywongkahei.github.io/img/pixel_art.png");
    sessionStorage.setItem("email", data.email);
    this.fetchUserOrCreateUser(data.name, null, data.locale, "https://larrywongkahei.github.io/img/pixel_art.png", data.email, null)
  },

  // Fetch data from github oauth api
  async FetchDataFromGithub(code) {
    const response = await fetch(`http://localhost:8080/login/github/code?code=${code}`)
    const data = await response.json()
    sessionStorage.setItem("name", data.login);
    sessionStorage.setItem("bio", data.bio)
    sessionStorage.setItem("location", data.location)
    sessionStorage.setItem("avatar_url", data.avatar_url);
    sessionStorage.setItem("email", data.email);
    this.fetchUserOrCreateUser(data.login, data.bio, data.location, data.avatar_url, data.email, null)
  },

  // Fetch data from linkedin oauth api
  async FetchDataFromLinkedin(code) {
    const response = await fetch(`http://localhost:8080/login/linkedin/code?code=${code}`)
    const data = await response.json()
    sessionStorage.setItem("name", data.localizedFirstName + " " + data.localizedLastName);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("avatar_url", "https://larrywongkahei.github.io/img/pixel_art.png");
    this.fetchUserOrCreateUser(data.localizedFirstName + " " + data.localizedLastName, null, null, "https://larrywongkahei.github.io/img/pixel_art.png", data.email, null)
  },
}

module.exports = APIService;