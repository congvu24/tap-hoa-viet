import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import AppRoute from './src/route';
import {RootSiblingParent} from 'react-native-root-siblings';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <AppRoute />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}
