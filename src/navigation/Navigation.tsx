import React, { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import Home from '../screens/homeTab/Home';
import CartScreen from '../screens/cartTab/CartScreen';
import ProductsScreen from '../screens/homeTab/ProductsScreen';
import store from '../redux/store/store';
import CheckoutScreen from '../screens/cartTab/CheckoutScreen';
import { AppState } from 'react-native';
import { loadState, saveState } from '../utils/persistence';
import { hydrateCart } from '../redux/action/action';

// Here we use both Tab and Stack Navigator.
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// Implement for tab navigation.
function TabBarNavigation() {
  const itemCartCount = useSelector(state => state.itemCartReducer).length;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="home" size={30} color={color} />;
          },
        }}
        name="Home"
        component={Home}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="shopping-bag" size={30} color={color} />;
          },
          tabBarBadge: itemCartCount,
          tabBarBadgeStyle: { backgroundColor: '#607D8B' },
        }}
        name="Cart"
        component={CartScreen}
      />
    </Tab.Navigator>
  );
}
// Implement for stack navigation.
function Navigation(): React.JSX.Element {
  // Save the cart data when app go in background or kill mode.
  useEffect(() => {
    const sub = AppState.addEventListener('change', nextState => {
      if (nextState === 'background' || nextState === 'inactive') {
        const state = store.getState();
        // console.log(state);
        saveState(state);
      }
    });

    return () => sub.remove();
  }, []);
  // Restore the data in cart when use return to app after from the background or kill mode.
  useEffect(() => {
    const init = async () => {
      const savedState = await loadState();
      // console.log(savedState);
      if (savedState?.itemCartReducer) {
        store.dispatch(hydrateCart(savedState.itemCartReducer));
      }
    };

    init();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: '#fff',
          },
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="TabBarNavigation" component={TabBarNavigation} />
          <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default Navigation;
