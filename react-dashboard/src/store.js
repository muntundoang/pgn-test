import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const initialState = {
  user: {},
  allUsers: [],
  allDepartments: [],
  allSpendings: [],
  valBySearch: [],
  spending: [],
  access_token: null,
  loading: false,
};

export const store = create(
  devtools((set, get) => ({
    ...initialState,
    setUser: (user) => set(() => ({ user: user })),
    setToken: (token) => set(() => ({ access_token: token })),
    reset: () => set(initialState),
    fetchUser: async () => {
      try {
        set({ loading: true });
        const { data } = await axios.post("http://localhost:3001/auth", {
          access_token: get().access_token,
        });
        set({ user: await data.user });
        set({ Spending: await data.Spending });
        setTimeout(() => {
          set({ loading: false });
        }, 1000);
        return get().user;
      } catch (error) {
        console.log("error dari fetchUser ==>", error);
        set({ loading: false });
      }
    },
    fetchAllUser: async () => {
      try {
        set({ loading: true });
        const { data } = await axios.get("http://localhost:3001/user/getall");
        set({ allUsers: await data });
        set({ valBySearch: await data });
        setTimeout(() => {
          set({ loading: false });
        }, 1000);
        return get().users;
      } catch (error) {
        console.log("error dari fetchAllUser ==>", error);
        set({ loading: false });
      }
    },
    fetchAllDepartment: async () => {
      try {
        set({ loading: true });
        const { data } = await axios.get(
          "http://localhost:3001/department/getall"
        );
        set({ allDepartments: await data });
        setTimeout(() => {
          set({ loading: false });
        }, 1000);
        return get().allDepartments;
      } catch (error) {
        console.log("error dari fetchAllDepartment ==>", error);
        set({ loading: false });
      }
    },
    fetchAllSpending: async () => {
      try {
        set({ loading: true });
        const { data } = await axios.get(
          "http://localhost:3001/spending/getall"
        );
        set({ allSpendings: await data });
        setTimeout(() => {
          set({ loading: false });
        }, 1000);
        return get().allSpendings;
      } catch (error) {
        console.log("error dari fetchAllDepartment ==>", error);
        set({ loading: false });
      }
    },
    login: async (username, password) => {
      try {
        set({ loading: true });
        const { data } = await axios.post("http://localhost:3001/user/login", {
          username,
          password,
        });
        if (data) {
          const { access_token, user } = data;
          localStorage.setItem("access_token", access_token);
          set({ access_token: access_token });
          set({ user: user });
          setTimeout(() => {
            set({ loading: false });
          }, 1000);
          return user;
        }
        setTimeout(() => {
          set({ loading: false });
        }, 1000);
      } catch (error) {
        console.log(error);
        set({ loading: false });
      }
    },
    register: async (obj) => {
      try {
        set({ loading: true });
        const { data } = await axios.post(
          "http://localhost:3001/user/register",
          obj
        );
        if (data) {
          let { payload } = data;
          let obj = get().allUsers;
          let newObj = obj.map((e) => e);
          newObj.push(payload);
          set({ allUsers: await newObj });
          set({ valBySearch: await newObj });
          set({ loading: false });
          return data.message;
        }
        set({ loading: false });
      } catch (error) {
        console.log("error di store register ==>", error);
        set({ loading: false });
      }
    },
    deleteUser: async (id, role) => {
      try {
        set({ loading: true });
        const { data } = await axios.post(`http://localhost:3001/user/delete`, {
          id,
          role,
        });
        if (!data.error) {
          const arr = get().allUsers;
          let temp = [];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id !== id) {
              temp.push(arr[i]);
            }
          }
          console.log("newArr ==>", temp);
          set({ allUsers: temp });
          set({ valBySearch: temp });
          console.log("list category => ", get().allUsers);
        } else {
          throw data.error;
        }
        set({ loading: false });
        return data;
      } catch (error) {
        console.log("error di store deleteUser ==>", error);
        set({ loading: false });
      }
    },
    updateUser: async (obj, role) => {
      try {
        set({ loading: true });
        const { data } = await axios.post(`http://localhost:3001/user/update`, {
          data: obj,
          role,
        });
        if (!data.error) {
          const arr = get().allUsers;
          let temp = [];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === obj.id) {
              temp.push(data);
            } else {
              temp.push(arr[i]);
            }
          }
          set({ allUsers: temp });
          set({ valBySearch: temp });
        } else {
          throw data.error;
        }
        set({ loading: false });
        return data;
      } catch (error) {
        console.log("error di store updateUser ==>", error);
        set({ loading: false });
      }
    },
    setValBySearch: async (type, newValue) => {
      set({ loading: true });
      const allUsers = get().allUsers;
      switch (type) {
        case "name":
          if (newValue) {
            const val = await allUsers.filter((e) => e.name === newValue.name);
            if (val.length > 0) {
              set({ valBySearch: val });
            } else {
              set({ valBySearch: allUsers });
            }
          } else {
            set({ valBySearch: allUsers });
          }
          set({ loading: false });
          break;

        case "department":
          if (newValue) {
            const val = await allUsers.filter(
              (e) => e.departmentId === newValue.id
            );
            if (val.length > 0) {
              set({ valBySearch: val });
            } else {
              set({ valBySearch: allUsers });
            }
          } else {
            set({ valBySearch: allUsers });
          }
          set({ loading: false });
          break;

        default:
          break;
      }
    },
    updateValBySearch: (newValue) => {
      set({ loading: true });
      set({ valBySearch: newValue });
      set({ loading: false });
    },
    createDept: async (obj) => {
      try {
        set({ loading: true });
        const { data } = await axios.post(
          "http://localhost:3001/department/create",
          obj
        );
        if (data) {
          let { payload } = data;
          let arr = get().allDepartments;
          let newArr = arr.map((e) => e);
          newArr.push(payload);
          set({ allDepartments: await newArr });
          set({ loading: false });
          return data.message;
        }
        set({ loading: false });
      } catch (error) {
        console.log("error di store register ==>", error);
        set({ loading: false });
      }
    },
    updateDept: async (obj, role) => {
      try {
        set({ loading: true });
        const { data } = await axios.post(`http://localhost:3001/department/update`, {
          data: obj,
          role,
        });
        if (!data.error) {
          const arrDept = get().allDepartments;
          let temp = [];
          for (let i = 0; i < arrDept.length; i++) {
            if (arrDept[i].id === obj.id) {
              temp.push(data);
            } else {
              temp.push(arrDept[i]);
            }
          }
          set({ allDepartments: temp });
          const arrUser = get().allUsers
          arrUser.forEach((e) => {
            if(e.departmentId === obj.id){
              e.department = obj?.name
            }
          });
          console.log("arrUser ==> ", arrUser)
          set({ allUsers: await arrUser });
          set({ valBySearch: await arrUser });
        } else {
          throw data.error;
        }
        set({ loading: false });
        return data;
      } catch (error) {
        console.log("error di store updateUser ==>", error);
        set({ loading: false });
      }
    },
    deleteDept: async (id, role) => {
      try {
        set({ loading: true });
        const { data } = await axios.post(`http://localhost:3001/department/delete`, {
          id,
          role,
        });
        if (!data.error) {
          const arr = get().allDepartments;
          let temp = [];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id !== id) {
              temp.push(arr[i]);
            }
          }
          console.log("newArr ==>", temp);
          set({ allDepartments: temp });

          const arrUser = get().allUsers
          const newArrUser = arrUser.map((e) => {
            if(e.departmentId === id){
              return
            } else {
              return e
            }
          }).filter((e) => Boolean(e));
          console.log('new Arr User setelah delete department ==> \n', newArrUser)

          set({ allUsers: newArrUser });
          set({ valBySearch: newArrUser });
          console.log("list category => ", get().allUsers);
        } else {
          throw data.error;
        }
        set({ loading: false });
        return data;
      } catch (error) {
        console.log("error di store deleteUser ==>", error);
        set({ loading: false });
      }
    },
  }))
);
