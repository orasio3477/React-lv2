// 중앙 데이터 관리소를 설정하는 부분
import { createStore } from "redux";
import { combineReducers } from "redux";
import counter from "../modules/counter";
import users from "../modules/users";

const rootReducer = combineReducers({
  counter,
  users: users,
});
const store = createStore(rootReducer);

export default store;
