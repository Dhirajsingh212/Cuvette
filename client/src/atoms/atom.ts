import { atom } from "recoil";

const getInitialLoginState = () => {
  const storedValue = localStorage.getItem("isLoggedIn");
  return storedValue === "true";
};

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: getInitialLoginState(),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("isLoggedIn", newValue.toString());
      });
    },
  ],
});
