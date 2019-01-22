export function postData(url = ``, data = {}, token) {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
}

export function fetchData(url = ``, token) {
  // Default options are marked with *
  return fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, cors, *same-origin
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    }
  })
}