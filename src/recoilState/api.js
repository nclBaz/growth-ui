import axios from "axios"
const server = process.env.REACT_APP_API_URL

console.log("SERVER: ", server)

export const login = async creds => {
  const head = {
    method: "POST",
    url: "https://detart-fe.herokuapp.com/client/login",
    data: creds,
  }
  try {
    let response = await axios(head, { withCredentials: true })
    if (response.status === false) return

    response = response.data
    let client = {
      _id: response._id,
      name: response.name,
      surname: response.surname,
      image: response.image,
      email: response.email,
      device: response.device,
    }
    return client
  } catch (error) {
    console.log(error)
  }
}

export const getUser = async () => {
  try {
    let user = await axios.get(server + "client", {
      withCredentials: true,
    })
    if (user.status !== 200) return false
    user = user.data
    return user
  } catch (error) {
    if (!error.response) return
    if (error.response.status === 401) {
      try {
        await refreshTokens()
        let user = await axios.get(server + "client", {
          withCredentials: true,
        })
        if (!user) return false
        user = user.data
        return user
      } catch (error) {
        if (!error.response) return
        console.log(error.response)
      }
    }
  }
}

export const signup = async creds => {
  const head = {
    method: "POST",
    url: server + "client",
    data: creds,
  }
  try {
    let response = await axios(head, { withCredentials: true })
    if (response.status === false) return

    response = response.data
    let client = {
      _id: response._id,
      name: response.name,
      surname: response.surname,
      image: response.image,
      email: response.email,
      device: response.device,
    }
    return client
  } catch (error) {
    console.log(error)
  }
}

const refreshTokens = async () => {
  const config = {
    method: "POST",
    url: server + "client/refresh",
  }
  try {
    let refresh = await axios(config, { withCredentials: true })
  } catch (error) {
    console.log(error.response)
  }
}

export const updateProfileImage = async (id, file) => {
  const config = {
    method: "post",
    url: server + "client/image/",
    data: file,
  }
  try {
    let updateProfile = await axios(config, { withCredentials: true })
    if (updateProfile.status === false) return
    updateProfile = updateProfile.data
    return updateProfile
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401) return
      await refreshTokens()
      return false
    }
  }
}

export const updateProfile = async data => {
  const config = {
    method: "PUT",
    url: server + "client/",
    data,
  }
  try {
    let updateProfile = await axios(config, { withCredentials: true })
    if (updateProfile.status === false) return
    updateProfile = updateProfile.data
    return updateProfile
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401) return
      await refreshTokens()
      return false
    }
  }
}

export const allBlogPosts = async () => {
  const config = {
    method: "GET",
    url: server + "blog",
  }
  try {
    let posts = await axios(config, { withCredentials: true })
    console.log(posts)
    if (posts.status === false) return
    posts = posts.data
    return posts.reverse()
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401) return
      await refreshTokens()
      return false
    }
    console.log(error)
  }
}

export const createPost = async (post, image) => {
  const config = {
    method: "POST",
    url: server + "blog/",
    data: post,
  }
  try {
    let newPost = await axios(config, { withCredentials: true })
    if (newPost.status === false) return
    newPost = newPost.data

    if (image) {
      let newPostImage = await postImage(newPost._id, image)
      if (newPostImage.status === false) return
      newPostImage = newPostImage.data
      return newPostImage
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401) return
      await refreshTokens()
      return false
    }
    console.log(error)
  }
}

export const deletePost = async id => {
  const config = {
    method: "DELETE",
    url: server + "blog/" + id,
  }
  try {
    let deletedPost = await axios(config, { withCredentials: true })
    if (deletedPost.status === false) return
    deletedPost = deletedPost.data
    return deletedPost
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401) return
      await refreshTokens()
      return false
    }
    console.log(error)
  }
}

export const postImage = async (id, img) => {
  const fd = new FormData()
  fd.append("image", img)
  const config = {
    method: "POST",
    url: server + "blog/image/" + id,
    data: fd,
  }
  try {
    let image = await axios(config, { withCredentials: true })
    if (image.status === false) return
    image = image.data
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401) return
      await refreshTokens()
      return false
    }
    console.log(error)
  }
}
