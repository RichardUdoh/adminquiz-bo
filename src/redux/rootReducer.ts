import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import testReducer from './slices/test';
import loginReducer from './slices/login';
import sponsorReducer from './slices/sponsor';
import rolePermissionReducer from './slices/rolePermission';
import publiciteReducer from './slices/publicite';
import messageReducer from './slices/message';
import menuReducer from './slices/menu';
import userReducer from './slices/user';
import quizzReducer from './slices/quizz';
import questionReducer from './slices/question';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  login: loginReducer,
  sponsor: sponsorReducer,
  publicite: publiciteReducer,
  rolePermission: rolePermissionReducer,
  message: messageReducer,
  menu: menuReducer,
  user: userReducer,
  quizz: quizzReducer,
  test: testReducer,
  question: questionReducer
  
});

export { rootPersistConfig, rootReducer };
