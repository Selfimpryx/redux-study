### redux源码分析

学习redux的源码，并简单的实现一下。

redux运用了大量的函数式编程高阶函数，函数柯里化，函数组合，闭包等等

**API**

`createStore(reducer,preloadedState,enhancer)`

redux 全局只有一个store，通过createStore创建，createStore接收三个参数:

reducer： reducer是一个纯函数，操作当前页面状态树

preloadedState ： 初始状态

enhancer： 中间件，可以对dispatch做一些增强的功能

store的对象提供给方法:

* dispatch(action) 派发action
* subscribe(listener) 订阅页面状态
* getState 获取store当前的状态树 state
* replaceReducer(nextReducer) 基本用不到，替代store当前用于计算state的reducer

当我们想要页面发生变化的时候，就需要dispatch一个action动作就行，这个action可以是一个对象，也可以是一个函数，函数的话一般会被后面的中间件拦截处理，然后reducer函数会接收action，执行页面状态树的更新

一般action对象都有一个type属性 {type:'xxx',payload:'xxx'},通过描述这个action的名称来确定这个action

reducer是一个纯函数，指定输出返回指定结果，返回值依赖参数，不能修改参数，为了保证数据变化的可预测性，报错也可以方便查找错误，reducer一般是接受两个参数 (previousState,action) => newState 当前的页面状态和派发的action 然后返回一个新的state，不能直接改变值，如果是个对象的话需要创建一个新的对象或者是数组来承载数据，遵循着不可变性原则

当action多的时候，reducer通过不同的action做不同的处理，我们可以合理的拆分action，redux提供了一个工具函数 combineReducer

**combineReducer**

`combineReducers({key1:reducer1,key2:reducer2....})`

combineReducers 是一个函数，接受一个对象，不同reducer函数和页面状态数据树不同部分的映射匹配关系，返回一个新的函数,将所有的reducer组成一个rootReducer

**中间件**

`applyMiddleware(...middlewares)`

action被派发之后，到达reducer之前，我们可以通过中间件来做一些处理,比如说日志记录，调用异步等等

applyMiddleware是一个柯里化函数，依次执行中间件，每个中间件对dispatch有增强作用，然后将增强后的dispatch传给下一个中间件

`applyMiddleware(...middlewares) => (createStore) =>(reducer,preloadedState) =>{}`

然后创建了一个middlewareAPI,存放中间件需要的参数 getState和dispatch 

```js
const store = createStore(reducer);

const middlewareAPI ={
  getState:store.getState,
  dispatch:(action,...args) => dispatch(action,...args)
}
const chain = middle.map(middleware=>middleware(middlewareAPI))
```
然后通过compose 将各个中间件串联起来，compose内部是一个reducer函数，逐次执行中间件 并传递参数

中间件也是一个柯里化函数

`const middleware = store => next => action =>{}`

next是被上一个中间件增强后的dispatch，如果是第一个中间件的话，就是最开始store.dispatch,action一般都会有一个type代表这个action，可以通过拦截action的type 或者是 判断action的类型来做一个操作，

