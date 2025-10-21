export const addUserDetail = async (name, userName, password) => {
  const response = await fetch('http://localhost:3000/api/signup', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, userName, password }),
    credentials: "include"
  })
  return response.json();
}

export const checkTheUser = async (userName, password) => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
    credentials: "include"
  })
  return response.json()
}

export const isuserLogged = async () => {
  const response = await fetch('http://localhost:3000/api/isLogged', {
    method: 'GET',
    credentials: "include"
  })
  return response.json()
}

export const logOutUser = async () => {
  const response = await fetch('http://localhost:3000/api/logout', {
    method: 'GET',
    credentials: "include"
  })
  return response.json()
}

export const createGame = async () => {
  const response = await fetch('http://localhost:3000/api/createGame', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });
  return response.json()
}

export const lobbyDetails = async () => {
  const response = await fetch('http://localhost:3000/api/createGame', {
    method: 'GET',
    credentials: 'include'
  })
  return response.json()
}

export const joinInGame = async (code) => {
  const response = await fetch('http://localhost:3000/api/joinGame', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ code })
  })
  return response.json()
}
export const YourDetail = async () => {
  const response = await fetch('http://localhost:3000/api/yourDetail', {
    method: 'GET',
    credentials: 'include'
  })
  return response.json()
}
export const leaveLobby = async (id) => {
  const response = await fetch("http://localhost:3000/api/leaveLobby", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ id })
  })
  return response.json();
}