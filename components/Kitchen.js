import React from 'react';
import { View, Text, StyleSheet, ScrollView, Picker } from 'react-native';
import ProductList from './Product';

const kitchenProducts = [
  { id: '22', name: 'Kitchen Cabinet', price: '$899', image: { uri: 'https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/kitchen-cabinet-ideas-section-7-C428.jpg' }, description: 'Modern kitchen cabinet set.' },
  { id: '23', name: 'Refrigerator', price: '$1199', image: { uri: 'https://lg-sks-content.s3.us-west-1.amazonaws.com/2017-12/refrigeration_open_1440_1280_0.jpg' }, description: 'Energy-efficient refrigerator.' },
  { id: '24', name: 'Microwave Oven', price: '$199', image: { uri: 'https://m.media-amazon.com/images/I/61eGkK2H8ML._AC_UF1000_,1000_QL80_.jpg' }, description: 'Compact microwave oven with digital controls.' },
  { id: '25', name: 'Dishwasher', price: '$699', image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Dishwasher_with_dishes.JPG/1200px-Dishwasher_with_dishes.JPG' }, description: 'High-efficiency dishwasher.' },
  { id: '26', name: 'Kitchen Island', price: '$799', image: { uri: 'https://www.laurysenkitchens.com/wp-content/uploads/2021/11/LK20220129-277-min.jpg' }, description: 'Spacious kitchen island with storage.' },
  { id: '27', name: 'Cookware Set', price: '$299', image: { uri: 'https://majesticchef.pk/cdn/shop/files/A9905CCD-C8BA-4CAC-8503-197C8912B174.png?v=1721336491' }, description: 'Non-stick cookware set.' }
];

const Kitchen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kitchen Products</Text>
       
      </View>
      <ScrollView>
        <ProductList products={kitchenProducts} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
 
});

export default Kitchen; 