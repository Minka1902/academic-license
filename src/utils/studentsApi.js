import { PUBLIC_URL } from "./auth";

class studentsApi {
  constructor(props) {
    this._authToken = props.auth;
    this._rootUrl = props.rootUrl;
  }

  _fetch = ({ method = "GET", url = '/', data }) =>
    fetch(`${this._rootUrl}${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': '<calculated when request is sent>',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Host': '<calculated when request is sent>',
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse)

  _handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

  createStudent = ({ email, name, key }) => this._fetch({ method: "POST", url: "/add-student", data: { email, name, key } })
}
// ! DEBUG API
// const usersApiOBJ = new usersApi({ auth: '4den6CaDRe58L5Jx85R7E38xpVcn8TZcyqznqZVpKFAjeqqG80eZQc1WCtRNM1Aq', rootUrl: 'http://localhost:3001' });
// ! REAL API
const usersApiOBJ = new studentsApi({ auth: '4den6CaDRe58L5Jx85R7E38xpVcn8TZcyqznqZVpKFAjeqqG80eZQc1WCtRNM1Aq', rootUrl: PUBLIC_URL });
export default usersApiOBJ;
