const API_URL_MAIN = 'http://localhost:8080'
export function getProducts() {

  return fetch(API_URL_MAIN + '/api/products/')
    .then(res => res.json())
}