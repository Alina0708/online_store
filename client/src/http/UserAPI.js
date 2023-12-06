import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
  try{
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
}
catch(e){
  console.log(e);
}
};

export const authorization = async (email, password) => {
  try{
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
}catch(e){
  console.log(e);
}
};

export const check = async () => {
  try{
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
}catch(e){
  console.log(e);
}
};

export const sendMessage = async ({ nameUser, email, message }) => {
    try {
        const { data } = await $host.get("api/user/sendmessage", {
            params: { nameUser, email, message },
        });
        console.log("successful");
        return data;
    } catch (error) {
        console.error("error", error);
        throw new Error("Failed send message");
    }
};
