// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import BudgetEntryScreen from './Components/BudgetEntryScreen';
import BudgetEntryListingScreen from './Components/BudgetEntryListingScreen';
import store from './Components/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BudgetEntry">
          <Stack.Screen name="BudgetEntry" component={BudgetEntryScreen} />
          <Stack.Screen name="BudgetEntryListing" component={BudgetEntryListingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
