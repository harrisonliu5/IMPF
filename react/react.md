# React 16.8+

本身只涉及UI层，如果搭建大型应用，必须搭配一个前端框架。

## hooks

- useState
- useEffect
- createContext、useContext
- useReducer
- memo/useMemo
- useCallback
- useRef 、useImperativeHandle
- useFetch(react-hooks-fetch)

### useState

代替了state和setState

``` javascript
import React from 'react';
const { useState } = React;

function Button (){
  // value 就是state里的值
  // setValue 就是 setState
  
  const [value, setValue] = useState(0);
  
  function handleAdd(){
    setValue(value+1);
  }
  
  return (
  	<button onClick={handleAdd}>点击增加</button>
  );

}
```

### useEffect

代替了 componentDidMount , componentDidUpdate, componentWillUnmount

``` javascript
import React from 'react';
const { useEffect } = React;

const App = (props) => {
  // useEffect 是每次函数执行时都会更新。
  useEffect(()=>{
    // 根据params参数进行更新操作,等于 componentDidUpdate;
		// 当params是空数组,则等于 componentDidMount;
    return ()=>{
      // 当有return函数时，则等于 componentWillUnmount;
    }
  },prams:[]);
}
```

### useContext、createContext

``` javascript
import React from 'react';
const { createContext, useContext } = React;

// initValue 可以为基本数据类型、复杂数据类型、不写；
// AppContext可以不在任何组件中定义
const AppContext = createContext(initValue);

// 子组件中
const Child = ()=>{
  // 通过 useContext 获取 AppContext 中的值
  const context = useContext(AppContext);
  return <span>{context}</span>
}

// value就是 initValue 的值
const App = () =>{
  <AppContext.Provider value={initValue}>
  	<Child />
  </AppContext.Provider>
}

```

### useReducer

用法和redux类似

``` javascript
import React from 'react';
const { useReducer } = React;

const initState = 0;

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

const Counter = () =>{
	const [state, dispatch] = useReducer(reducer,initState);  
  return (
  	<button onClick={()=>dispatch({type:'increment'})}></button>
  );
}

```

### useMemo、memo

用来进行渲染优化，useMemo当定义的值根据一定条件时，可以不更新当前组件。memo是React自行根据传入的props进行值的对比，没有发生改变时，不渲染组件。只能对比基本数据类型。

``` javascript
import React from 'react';
const { useMemo, useState, memo } = React;

// 根据props的值进行判断是否渲染
const Counter = memo(props => {
  console.log("组件渲染");
  return <h1>{props.data}</h1>;
});

const App = () =>{
  const [count, setCount] = useState(0);
  
  // 当count === 3 的时候改变 double;
  const double = useMemo(() => {
    return count * 2;
  }, [count === 3]);
  
  return <div>
    <span>{double}</span>
   	<input
        type="button"
        onClick={() => setCount(count + 1)}
        value="修改count"
      />
  	<Counter data={count} />
  </div>
}


```

### useCallback

效果和useMemo一样，`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`;

渲染的原因是，函数不能做对比，每次渲染都会定义一个新的函数。

``` javascript
const Counter = memo(props => {
  console.log("子组件渲染");
  return <h1 onClick={props.onClick}>1</h1>;
});

const Father = () => {
  const [count, setCount] = useState(0);
  const onClick = useCallback(() => {
    console.log("Click");
  }, []);
   return (
    <>
      <span>{count}</span>
      <input
        type="button"
        onClick={() => setCount(count + 1)}
        value="修改count"
      />
      <Counter onClick={onClick}/>
    </>
  );
}  
```

### uesRef、useImperativeHandle、forwardRef

 uesRef 是创建一个ref对象进行Dom的操作

`useImperativeHandle` 可以让父组件直接调用 `ref` 的方法，应该和 `forwardRef` 一起使用。

``` javascript
import React from 'react';
const { uesRef, useImperativeHandle, forwardRef } = React;

const Child = forwardRef((prop,ref)=>{
  useImperativeHandle(ref, () => ({
    method: () => {
     console.log('child');
    }
  }));
  return <span>子组件</span>;
})

const Father = () =>{
  const ref = uesRef();
  
  useEffect(()=>{
    ref.current.method();
  }, []);
  
  return <>
  	<Child ref={ref} />  
  </>
}
```

### useFetch

``` javascript
import React, { Suspense } from 'react';
import { useFetch } from 'react-hooks-fetch';
 
const DisplayRemoteData = () => {
  const { error, data } = useFetch('http://...');
  if (error) return <span>Error:{error.message}</span>;
  if (!data) return null; // this is important
  return <span>RemoteData:{data}</span>;
};
 
const App = () => (
  <Suspense fallback={<span>Loading...</span>}>
    <DisplayRemoteData />
  </Suspense>
);
export default App;
```

## 更新内容

### 生命周期

#### 15生命周期

![15生命周期](\img\react15生命周期.png)



#### 15后期流程

![react15声明后期流程](\img\react15声明后期流程.png)

#### 16.8

![react16周期](\img\react16周期-1.png)