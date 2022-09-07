import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import SonedeScreen from './screens/Sonede';
import StegScreen from './screens/Steg';
import TelecomScreen from './screens/Telecom';
import TopnetScreen from './screens/Topnet';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  // Initialize Apollo Client
  const client = new ApolloClient({
    uri: 'http://192.168.1.200:3001/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Home'}}
          />
          <Stack.Screen name="Sonede" component={SonedeScreen} />
          <Stack.Screen name="Steg" component={StegScreen} />
          <Stack.Screen name="Topnet" component={TopnetScreen} />
          <Stack.Screen name="Telecom" component={TelecomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};
export default MyStack;
