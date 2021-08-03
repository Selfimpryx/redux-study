/**  
 *  中间件 增强dispatch的功能 
 *  仿redux-logger的功能 在dispatch action前后打印相关信息
 */

// 取代原生的dispatch方法
export const logger = (store)=> (next)=>{
  // console.log(111)
  // console.log(store)
  // 该函数应该 在行为上同dispatch保持一致，因此这个函数要返回一个新的函数
  // const rawDispatch = store.dispatch;

  // 没执行一个中间件，所获得的store.dispatch 都会被改造
  // const next = store.dispatch;
  return (action)=>{
    // 按照action类型输出分组
    console.group(action.type)
    // 打印更新前的state
    console.log('%c previous state','color:red',store.getState())
    // 打印当前的action
    console.log('%c action', 'color:red',action)

    // const returnValue = rawDispatch(action);
    const returnValue = next(action);

    // 打印更新后额state
    console.log('%c next state', 'color:red' , store.getState())

    console.group(action.type)

    return returnValue;

  }
}