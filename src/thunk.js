/** 
 *  redux.thunk雏形
 */

export const promise = (store)=>(next)=>{
  // const rawDispatch = store.dispatch;
  // 没执行一个中间件，所获得的store.dispatch 都会被改造
  // const next = store.dispatch;
  return (action)=>{
    if(typeof action.then === 'function'){
      return action.then(next)
    }
    // return rawDispatch(action)
    return next(action)
  }
}
// 判断是不是一个promise 是不是thenable 如果是 进行处理