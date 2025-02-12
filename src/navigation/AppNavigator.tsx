import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import GameScreen from '../screens/GameScreen';
import GamePlayScreen from '../screens/GamePlayScreen';
import CartScreen from '../screens/CartScreen';
import { Product } from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export type RootStackParamList = {
  HomeMain: undefined;
  ProductDetails: {product: Product};
  GameMain: undefined;
  GamePlay: undefined;
  Cart: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Game: undefined;
  Cart: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{title: 'Reward Mart'}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{title: 'Product Details'}}
      />
    </Stack.Navigator>
  );
};

const GameStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GameMain"
        component={GameScreen}
        options={{title: 'Play & Win'}}
      />
      <Stack.Screen
        name="GamePlay"
        component={GamePlayScreen}
        options={{
          presentation: 'modal',
          title: 'Game Challenge',
        }}
      />
    </Stack.Navigator>
  );
};

const getTabBarIcon = (
  focused: boolean,
  color: string,
  size: number,
  route: RouteProp<BottomTabParamList, keyof BottomTabParamList>,
) => {
  let iconName = '';

  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Game':
      iconName = focused ? 'game-controller' : 'game-controller-outline';
      break;
    case 'Cart':
      iconName = focused ? 'cart' : 'cart-outline';
      break;
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const AppNavigator = () => {
  const cartItemCount = useSelector((state: RootState) =>
    Object.values(state.cart.items).reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  );
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>
          getTabBarIcon(focused, color, size, route),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Game"
        component={GameStack}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Cart" component={CartScreen}
        options={{
        tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
      }}/>
    </Tab.Navigator>
  );
};

export default AppNavigator;
