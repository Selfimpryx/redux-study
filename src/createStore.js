/** 
 *  creatStore(reducer,enhancer)
 * 创建一个store对象，这个store包含着 
 * getState:获取state数据
 * dispatch:派发一个action 修改state数据 更新store
 * subscribe:订阅store状态变化 传入一个函数 返回取消订阅的方法
 * 
 * @param reducer reducer或者是 combineReducer生成的rootReducer
 * @param preloadedState 初始状态
 * @param enhancer applyMiddleware 生成的中间件
 */



export const createStore = (reducer, preloadedState,enhancer) =>{

  // console.log(preloadedState)
  // 如果将applyMiddleware作为第二个参数，第三个参数不传
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined'){
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  
  // debugger;
  // 如果有中间件的话
  if (typeof enhancer !== 'undefined'){
    if (typeof enhancer !== 'function'){
      // 第三个参数必须是函数
      throw new Error('enhancer to be function')
    }
    // 交给中间件处理 对dispatch做增强的作用
    return enhancer(createStore)(reducer, preloadedState)
  }

  if (typeof reducer !== 'function'){
    throw new Error('reducer 必须是一个 function')
  }
  let state; //初始化state
  let listeners = []; //设置一个监听数据  监听所有的方法
  let isDispatching = false //是否正在执行 reducer


  // 设置getState subscribe dispatch 都是闭包函数
  const getState = ()=>{
    if(isDispatching ){ //如果reducer正在运行中
      throw new Error('reducer正在运行中')
    }
    return state
  };

  const subscribe = (listen)=>{
    if(typeof listen !== 'function'){
      throw new Error('要监听的对象必须是一个函数')
    }
    let isSubscribe = true;
    // 添加到监听数组
    listeners.push(listen);
    // 返回一个回调函数 可以移除监听 运用闭包的特性
    return ()=>{
      if(!isSubscribe){
        return;
      }
      isSubscribe = false;
      // 找到那个监听的函数  然后移除
      const index = listeners.indexOf(listen);
      listeners.splice(index,1)
    }
  };

  const dispatch = (action)=>{
    // action 必须是一个原始对象 {type:xxx,payload:xxx} 如果是函数的话 交给中间件处理
    try{
      // reducer正在运行
      isDispatching = true;
      // 执行这个reducer 函数 返回新的state
      state = reducer(state,action)
    } finally{
      // dispatch结束  reducer执行完了
      isDispatching = false;
    }

    // 每一次调用dispatch 状态更新 就调用listeners数组的每一个监听函数
    listeners.forEach(listen => listen());

    // 返回传入的action
    return action;

  };

  // createStore 被调用后 Redux就会设置一个初始的空状态 redux内置一些私有action Type 后面加上随机数  防止混了
  dispatch({ type: `@@redux/INIT${Math.random().toString(36).substring(7).split('').join('.')}`})

  return {
    getState,
    subscribe,
    dispatch
  }
}

