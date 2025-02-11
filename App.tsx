// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReelsScreen from './src/screens/ReelsScreen';
import DetailScreen from './src/screens/DetailScreen';
import 'react-native-gesture-handler';


// Define the shape of a single reel
export interface Reel {
  id: string;
  videoUrl: string;
  title: string;
  description: string;
}

// Define our navigation stack's routes
export type RootStackParamList = {
  Reels: undefined;
  Detail: { reel: Reel };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Reels" component={ReelsScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
