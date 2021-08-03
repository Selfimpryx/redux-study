/** 
 *  combineReducers 
 * {
 * key1:reducer1,
 * key2:reducer2,
 * ... 
 * }
 * 传入一个键值对，将多个reducer函数 转换为一个reducer函数
 */

export function combineReducer(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    // 将不是函数的reducer过滤掉了
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducersKeys = Object.keys(finalReducers);
  return function combination(state = {}, action) {
    // 返回一个新函数 执行所有所有的reducer 将返回的state 保存在 nextState中 键值对的形式
    // 可以用for循环的方式
    return finalReducersKeys.reducer((nextState, key) => {
      nextState[key] = finalReducers[key](state, action);
      return nextState;
    }, {})
  }
}