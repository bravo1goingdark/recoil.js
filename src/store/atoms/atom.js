import { atom, atomFamily, DefaultValue, selector, selectorFamily } from "recoil";
import { TODO } from "../../assets/todo";

export const countAtom = atom({
  key: "countAtom",
  default: 0, 
});

export const isEvenSelector = selector({
  key: "isEvenSelector",
  get: ({ get }) => get(countAtom) % 2 === 0 ,
  set: ({ set, reset }, newValue) => newValue instanceof DefaultValue ? reset(countAtom) : set(countAtom , newValue)
});

export const fetchAtom = atom({
  key : "fetchAtom",
  default : selector({
    key : "fetchAtomSelector",
    get : async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      return data;
    }
  })
});

export const fetchTodo = atomFamily({
  key : "fetchTodo",
  default : id => TODO.find(item => item.id === id)
});

export const fetchPost = atomFamily({
  key : "fetchPost",
  default : selectorFamily({
    key : "fetchPostSelector",
    get :  id => async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const data = await response.json();
      return data;
    }
  })
});
