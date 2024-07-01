// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './src/context/UserContext';
import About from './src/screens/About';
import Home from './src/screens/Home';
import Admin from './src/screens/Admin';
import Authentication from './src/screens/Authentication';
import Users from './src/screens/Users';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="About">
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="Users" component={Users} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
