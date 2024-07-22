import { useRecoilValue, RecoilRoot, useSetRecoilState, useRecoilValueLoadable, useRecoilStateLoadable } from "recoil";
import {
  countAtom,
  fetchAtom,
  fetchPost,
  fetchTodo,
  isEvenSelector,
} from "./store/atoms/atom";
import { DefaultValue } from "recoil";
import { Fragment } from "react";

export default function App() {
  return (
    <div>
      <RecoilRoot>
        <Count />
        <RenderPost id={1}/>
        <RenderPost id={2}/>
        <RenderPost id={3}/>
        <Todo id={1} />
        <Todo id={2} />
        <Todo id={2} />
        <Todo id={2} />
        <Todo id={2} />
      </RecoilRoot>
    </div>
  );
}
const Todo = ({ id }) => {
  const { title, description } = useRecoilValue(fetchTodo(id));
  const setUpdate = useSetRecoilState(fetchTodo(2));

  return (
    <div>
      <li>{title}</li>
      <li>{description}</li>
      {id === 2 ? (
        <button
          onClick={() =>
            setTimeout(
              () =>
                setUpdate((curr) => ({ ...curr, description: "pizza burger" })),
              5000
            )
          }
        >
          set
        </button>
      ) : null}
      <br />
    </div>
  );
};
const RenderPost = ({id}) => {
  // return only value
  const {state , contents : {body,title}} = useRecoilValueLoadable(fetchPost(id));
  // return a value and an updater function
  const [loadable , setLoadbale] = useRecoilStateLoadable(fetchPost(id));


  return (
    <div>
      {/* {prop.map(({ body, title }, index) => (
        <Fragment key={index}>
          <li>Body :{body}</li>
          <li>Title :{title}</li>
          <br />
        </Fragment>
      ))} */}
      {state === 'loading' ? <div>Loading...</div> : <><li>Body :{body}</li>
      <li>Title :{title}</li>
      <br /></>}
    </div>
  );
};

function Count() {
  console.log("re-render");
  return (
    <div>
      <CountRenderer />
      <EvenRender />
      <Buttons />
    </div>
  );
}
function EvenRender() {
  const isEven = useRecoilValue(isEvenSelector);

  return <div>{isEven ? "it is even" : "not even"}</div>;
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);

  return (
    <div>
      <b>{count}</b>
    </div>
  );
}

function Buttons() {
  console.log("buttons re-rendererd");
  const setCount = useSetRecoilState(countAtom);
  const setIsEven = useSetRecoilState(isEvenSelector);

  return (
    <div>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount((count) => count - 1);
        }}
      >
        Decrease
      </button>
      <button
        onClick={() => {
          const value = parseInt(prompt());
          setIsEven(value);
        }}
      >
        Set number
      </button>
      <button
        onClick={() => {
          setIsEven(new DefaultValue());
        }}
      >
        Reset Count
      </button>
    </div>
  );
}
