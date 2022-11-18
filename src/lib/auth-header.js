export default function authHeader() {
  const dataUser = localStorage.getItem("clotht");
  let dataToken;
  let authToken;
  if (dataUser) {
    dataToken = JSON.parse(localStorage.getItem("clotht"));
  }
  const token = dataToken?.token;
  if (token) {
    authToken = `Bearer ${token}`;
    return {
      Authorization: authToken,
    };
  }
  return {};
}
