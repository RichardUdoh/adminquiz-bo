import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import testReducer from './slices/test';
import loginReducer from './slices/login';
import sponsorReducer from './slices/sponsor';
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
  test: testReducer
});

export { rootPersistConfig, rootReducer };
