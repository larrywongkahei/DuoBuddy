export const APIService =
{
  // Add user to database
  createUser(name: string, bio: string | null, location: string | null, avatar: string, email: string | null, password: string | null) {
    return fetch("https://mentorshipbackend-ceeb21a607e1.herokuapp.com/user",
      {
        method: "POST",
        body: JSON.stringify({ "name": name, "bio": bio, "location": location, "avatarUrl": avatar, "email": email, "password": password }), headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            sessionStorage.setItem("email", data.email);
            sessionStorage.setItem("userId", data.id);
            sessionStorage.setItem("name", data.name);
            sessionStorage.setItem("avatar_url", data.avatarUrl);
          }).then(() => window.location.href = "https://larrywongkahei.github.io/MentorShip/")

        }
        else {
          return alert("User Exist")
        }
      })
  },

  // Handle signup
  async signup(name: string, email: string, password: string) {
    await this.createUser(name, null, null, "https://larrywongkahei.github.io/img/pixel_art.png", email, password)
  },

  async signin(email: string, password: string) {
    const fetchdata = await fetch("https://mentorshipbackend-ceeb21a607e1.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify({
        "email": email,
        "password": password
      }), headers: { 'Content-Type': 'application/json' }
    })
    if (fetchdata.status !== 200) {
      return alert("Wrong detail")
    }
    const data = await fetchdata.json()
    sessionStorage.setItem("name", data.name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("avatar_url", "https://larrywongkahei.github.io/img/pixel_art.png")
    sessionStorage.setItem("userId", data.id)
    return window.location.href = "https://larrywongkahei.github.io/MentorShip/"
  },

  // Used when user has logged in and reload page
  fetchUser(email: string | null) {
    return fetch(`https://mentorshipbackend-ceeb21a607e1.herokuapp.com/user/dataFetching?email=${email}`)
      .then(response => response.json())
  },

  // Check if user in the database, if not, Create user
  async fetchUserOrCreateUser(name: string, bio: string | null, location: string | null, avatar_url: string, email: string | null, password: string | null) {
    const fetchdata = await fetch(`https://mentorshipbackend-ceeb21a607e1.herokuapp.com/user/dataFetching?email=${email}`)
    if (fetchdata.status === 200) {
      const data = await fetchdata.json()
      sessionStorage.setItem("userId", data.id)
      window.location.href = "https://larrywongkahei.github.io/MentorShip/"
    }
    else {
      this.createUser(name, bio, location, avatar_url, email, password)
    }
  },

  // Post project to database
  createProject(payload: Record<string, string | null | string[]>) {
    return fetch("https://mentorshipbackend-ceeb21a607e1.herokuapp.com/project",
      {
        method: "POST",
        body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }
      })
      .then(data => data.json())
  },

  // Update user detail, input bio, location or projects in param field
  // for project, input project id into the body
  updateUser(userId: string | null, param: string, payload: Record<string, string> | string) {
    return fetch(`https://mentorshipbackend-ceeb21a607e1.herokuapp.com/user/${userId}/${param}`,
      { method: "PUT", body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
      .then(data => data.json())
  },

  getAllProject() {
    return fetch("https://mentorshipbackend-ceeb21a607e1.herokuapp.com/project")
      .then(response => response.json())
  },

  getProjectById(id: string) {
    return fetch(`https://mentorshipbackend-ceeb21a607e1.herokuapp.com/project/${id}`)
      .then(response => response.json())
  },
  // searchData could be tags or title
  getProjectsBySearch(searchData: string) {
    return fetch(`https://mentorshipbackend-ceeb21a607e1.herokuapp.com/project/getSearchResult?searchData=${searchData}`)
      .then(response => response.json())
  },
  getUserById(id: string) {
    return fetch(`https://mentorshipbackend-ceeb21a607e1.herokuapp.com/user/dataFetching?id=${id}`)
      .then(response => response.json())
  },

  // Add comment to project
  commentProject(projectId: string, userId: string | null, content: string | null) {
    return fetch(`https://mentorshipbackend-ceeb21a607e1.herokuapp.com/project/${projectId}?userId=${userId}`, {
      method: "PUT",
      body: content,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  applyToBuildProject(projectId: string, userId: string | null, content: string | null) {
    return fetch(`https://mentorshipbackend-ceeb21a607e1.herokuapp.com/project/${projectId}?userId=${userId}`, {
      method: "PUT",
      body: content,
      headers: { 'Content-Type': 'application/json' }
    })
  },

  // Fetch data from google oauth api
  async FetchDataFromGoogle(token: string) {
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
  async FetchDataFromGithub(code: string) {
    const response = await fetch(`https://mentorshipbackend-ceeb21a607e1.herokuapp.com/login/github/code?code=${code}`)
    const data = await response.json()
    sessionStorage.setItem("name", data.login);
    sessionStorage.setItem("bio", data.bio)
    sessionStorage.setItem("location", data.location)
    sessionStorage.setItem("avatar_url", data.avatar_url);
    sessionStorage.setItem("email", data.email);
    this.fetchUserOrCreateUser(data.login, data.bio, data.location, data.avatar_url, data.email, null)
  },

  // Fetch data from linkedin oauth api
  async FetchDataFromLinkedin(code: string) {
    const response = await fetch(`https://mentorshipbackend-ceeb21a607e1.herokuapp.com/login/linkedin/code?code=${code}`)
    const data = await response.json()
    sessionStorage.setItem("name", data.localizedFirstName + " " + data.localizedLastName);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("avatar_url", "https://larrywongkahei.github.io/img/pixel_art.png");
    this.fetchUserOrCreateUser(data.localizedFirstName + " " + data.localizedLastName, null, null, "https://larrywongkahei.github.io/img/pixel_art.png", data.email, null)
  },
}