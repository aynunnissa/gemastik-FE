export default function authHeader() {
  const dataUser = localStorage.getItem("cltrt");
  let dataToken;
  let authToken;
  if (dataUser) {
    dataToken = JSON.parse(localStorage.getItem("cltrt"));
  }
  const token = dataToken?.access_token;
  if (token) {
    authToken = `Bearer ${token}`;
    return {
      Authorization: authToken,
      "Access-Control-Allow-Origin": "*",
    };
  }
  return {};
}
