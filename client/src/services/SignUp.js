export const addUserDetail = async (name, userName, password, avtar) => {
  const response = await fetch('http://192.168.0.103:3000/api/signup', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, userName, password, avtar }),
    credentials: "include"
  })
  return response.json();
}

export const checkTheUser = async (userName, password) => {
  const response = await fetch('http://192.168.0.103:3000/api/login', {
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
  const response = await fetch('http://192.168.0.103:3000/api/isLogged', {
    method: 'GET',
    credentials: "include"
  })
  return response.json()
}

export const logOutUser = async () => {
  const response = await fetch('http://192.168.0.103:3000/api/logout', {
    method: 'GET',
    credentials: "include"
  })
  return response.json()
}

export const createGame = async () => {
  const response = await fetch('http://192.168.0.103:3000/api/createGame', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });
  return response.json()
}

export const lobbyDetails = async () => {
  const response = await fetch('http://192.168.0.103:3000/api/createGame', {
    method: 'GET',
    credentials: 'include'
  })
  return response.json()
}

export const joinInGame = async (code) => {
  const response = await fetch('http://192.168.0.103:3000/api/joinGame', {
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
  const response = await fetch('http://192.168.0.103:3000/api/yourDetail', {
    method: 'GET',
    credentials: 'include'
  })
  return response.json()
}
export const leaveLobby = async (id) => {
  const response = await fetch("http://192.168.0.103:3000/api/leaveLobby", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ id })
  })
  return response.json();
}
export const DeleteLobby = async () => {
  const response = await fetch("http://192.168.0.103:3000/api/delete", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify()
  })
  return response.json();
}

export const gameStarted = async () => {
  const response = await fetch("http://192.168.0.103:3000/api/startGame", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ message: "game started" })
  })
}

export const dieRolled = async (outcome) => {
  const response = await fetch("http://192.168.0.103:3000/api/dieRolled", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ outcome: outcome })
  })
  return response.json();
}

export const buyTicket = async (data) => {
  const response = await fetch("http://192.168.0.103:3000/api/buy", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ player: data.player })
  })
  return response.json();

}

export const ticketCheck = async (data) => {
  const response = await fetch("http://192.168.0.103:3000/api/ticketCheck", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ player: data.player, outcome: data.outCome })
  })
  return response.json();
}
export const result = async () => {
  const response = await fetch('http://192.168.0.103:3000/api/results', {
    method: 'GET',
    credentials: 'include'
  })
  return response.json()
}

export const sell = async (data) => {
  const response = await fetch("http://192.168.0.103:3000/api/sellTickets", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ position: data.id })
  })
  return response.json();
}
export const theme = async () => {
  const response = await fetch('http://192.168.0.103:3000/api/theme', {
    method: 'GET',
    credentials: 'include'
  })
  return response.json()
}
export const themeNext = async (theme) => {
  const response = await fetch("http://192.168.0.103:3000/api/next", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ themeName: theme })
  })
  return response.json();
}