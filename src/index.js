// 整合一下之前的中间件
import { createStore } from './createStore.js';
import { applyMiddleware} from './applyMiddleware';
import { logger } from './logger';
import { promise } from './thunk';

export const reducer = (state = { num: 0 }, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, num: state.num + 1 }
    default:
      return { ...state }
  }
}

const store = createStore(reducer, applyMiddleware(logger, promise));

function listen(){
  console.log('监听state')
}
store.subscribe(listen)


store.dispatch({
  type: 'ADD'
})
const state = store.getState();
console.log(state)

