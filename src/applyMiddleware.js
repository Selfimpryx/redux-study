/**
 *  redux 就是将所有的中间件用数组存储起来，依次执行，每个中间件都对dispatch进行增强，返回一个新的dispatch
 * 然后将这个dispatch用next 向下传递
 * -
 */
export const applyMiddleware = (...middlewares) => (createStore) => (reducer)=>{
  const store = createStore(reducer);

  // 逐一执行中间件，各个中间件将增强后的store.dispatch作为参数传递
  middlewares.forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch)
  });

  return store;
}