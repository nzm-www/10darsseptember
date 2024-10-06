import { create } from "zustand";
import { Navigate, useNavigate } from "react-router-dom";
export const useAppStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  setUser: (user) =>
    set((state) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user")
      }
      return { user };
    }),
}));


// import { create } from "zustand";
// import { Navigate, useNavigate } from "react-router-dom";
// export const useAppStore = create((set) => ({
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   setUser: (user) =>
//     set((state) => {
//       if (user) {
//         localStorage.setItem("user", JSON.stringify(user));
//       } else {
//         localStorage.removeItem("user")
//       }
//       return { user };
//     }),
// }));
