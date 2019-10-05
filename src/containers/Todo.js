import React, { Suspense, lazy, useEffect, useState } from "react";

import AddLi from "../components/AddLi";
import Loader from '../components/common/Loader';
import Title from "../components/Title";
import TodoLi from "../components/TodoLi";

const todosData = [
    '이것도 해야 되고',
    '저것도 해야 되고',
    '그것도 해야 되고',
    '언제 다 하나',
]
const textData = "To do list";
// https://ko.reactjs.org/docs/code-splitting.html
const LazyTodoLi = lazy(() => import("../components/TodoLi"));

function Todo() {
    const [todos, setTodos] = useState(todosData);

    // useEffect works basically as componentDidMount and componentDidUpdate
    useEffect(() => {
        console.log("렌더링 중");
    });

    const _updateAddData = (todo) => {
        // 입력 값이 빈 스트링일 때에는 입력이 되지 않도록 
        if (!todo.trim()) {
            return false;
        }
        // 왜 원본에 손을 대면 안되고 복사본을 가지고 해야하는지 알수있을까?? 사람들과 공유해 보자 (imutable ???)
        // 리액트에서는 상태의 변화를 원본과 복제본으로 비교하기 때문에 원본의 불변성을 지켜주기 위해 복사본을 만든다 
        // 이 복사본에 변경이 생기면 원본과 차이가 나타나기 때문에 그 비교된 차이점을 현재 상태에 반영한다
        // 이와 같은 방법이 리소스 낭비라고 생각되는 부분이 있다 한 화면에 사용되는 메모리 차원에서 최대 2배까지 사용될 수 있는 부분이다 
        // 다만 SPA 개발을 할 때 한 화면에 매우 많은 내용을 담는 것은 지양되기 때문에 화면 특성을 고려해서 react로 개발을 할 수 있을 것 같다
        const newArr = todos.slice();
        console.log(newArr);
        console.log(todos);
        
        // 복사본으로 해야 변경된 부분이 적용된다
        newArr.push(todo);
        setTodos(newArr);
    }

    const _removeData = (todo) => {
        // 여기도 마찬가지로 복사본을 가지고 삭제해 줘야지만 화면에 다시 그려진다 
        const newArr = todos.slice();

        const index = newArr.indexOf(todo);

        newArr.splice(index, 1);

        setTodos(newArr);
    }

    return (
      <div className="container">
        <Title value={textData} />
        <AddLi updateAddData={_updateAddData} />
        <hr />
        <ul>
          {todos.map((todo, i) => {
            return (
              <TodoLi todo={todo} key={"todo" + i} removeData={_removeData} />
            );
          })}
        </ul>
      </div>
    );

}

export default Todo;