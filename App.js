import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Bedroom from './components/Bedroom';
import WishList from './components/wishList';
import Living from './components/Living';
import Kitchen from './components/Kitchen';
import Study from './components/Study';
import ProductDetail from './components/ProductDetail';
import Search from './components/Search';
import Cart from './components/Cart';
import Outdoor from './components/Outdoor';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import ConfirmationScreen from './components/ConfirmationScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: { backgroundColor: 'white' },
      drawerContentStyle: { color: 'black' },
      drawerActiveTintColor: 'black',
      drawerInactiveTintColor: 'black',
      headerStyle: { backgroundColor: 'darkgrey' },
      headerTintColor: 'white',
    }}
  >
    <Drawer.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        headerRight: () => (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.iconButton}>
              <FontAwesome5 name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
              <FontAwesome name="shopping-cart" size={30} color="white" />
            </TouchableOpacity>

          </View>
        ),
      })}
    />
    <Drawer.Screen
      name="Bedroom"
      component={Bedroom}
      options={({ navigation }) => ({
        headerRight: () => (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.iconButton}>
              <FontAwesome5 name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
              <FontAwesome name="shopping-cart" size={30} color="white" />
            </TouchableOpacity>
          </View>
        ),
      })}
    />
    <Drawer.Screen
      name="Living"
      component={Living}
      options={({ navigation }) => ({
        headerRight: () => (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.iconButton}>
              <FontAwesome5 name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
              <FontAwesome name="shopping-cart" size={30} color="white" />
            </TouchableOpacity>
        
          </View>
        ),
      })}
    />
    <Drawer.Screen
      name="Outdoor"
      component={Outdoor}
      options={({ navigation }) => ({
        headerRight: () => (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.iconButton}>
              <FontAwesome5 name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
              <FontAwesome name="shopping-cart" size={30} color="white" />
            </TouchableOpacity>
        
          </View>
        ),
      })}
    />
    <Drawer.Screen
      name="Study"
      component={Study}
      options={({ navigation }) => ({
        headerRight: () => (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.iconButton}>
              <FontAwesome5 name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
              <FontAwesome name="shopping-cart" size={30} color="white" />
            </TouchableOpacity>
            
          </View>
        ),
      })}
    />
    <Drawer.Screen
      name="Kitchen"
      component={Kitchen}
      options={({ navigation }) => ({
        headerRight: () => (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.iconButton}>
              <FontAwesome5 name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
              <FontAwesome name="shopping-cart" size={30} color="white" />
            </TouchableOpacity>
            
          </View>
        ),
      })}
    />
  </Drawer.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: true }} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default App;
