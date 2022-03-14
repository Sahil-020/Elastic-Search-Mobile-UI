import axios from "axios";
import qs from "qs";
import { toast } from "react-toastify";
import {
  basketBaseUrl,
  grantType,
  clientId,
  clientSecret,
  tokenUsername,
  tokenPassword,
  tokenScope,
} from "../../utils/constants";

async function GetAuthToken() {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };
  var data = {
    grant_type: grantType,
    client_id: clientId,
    client_secret: clientSecret,
    username: tokenUsername,
    password: tokenPassword,
    scope: tokenScope,
  };
  // console.log("token data: ", data);
  return await axios
    .post(
      basketBaseUrl + "/identity/connect/token",
      qs.stringify(data),
      headers
    )
    .then(function (res) {
      // console.log("token authentication res: ", res);
      return res.data;
    })
    .catch(function (error) {
      console.log("token authentication error: ", error);
      toast.error("Authentication Error !", {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
        theme: "colored",
      });
    });
}

export default GetAuthToken;
