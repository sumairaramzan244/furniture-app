import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('WishList')} style={styles.footerButton}>
        <MaterialIcons name="favorite" size={30} color="white" />
      </TouchableOpacity>
     
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.footerButton}>
        <MaterialIcons name="account-circle" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'darkgrey',
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Footer;
