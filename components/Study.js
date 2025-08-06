import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import ProductList from './Product';

const studyProducts = [
  { id: '17', name: 'Study Desk', category: 'Study', image: { uri: 'https://homelo.pk/cdn/shop/products/IMG_20220519_050643_142.jpg?v=1682114303' }, price: '$299', description: 'Spacious study desk with drawers.' },
  { id: '18', name: 'Ergonomic Chair', category: 'Study', image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL3lKKh7IRTycrVtz_SxtkeLDlkyAZjEAFoQ&s' }, price: '$149', description: 'Comfortable ergonomic chair for long hours.' },
  { id: '19', name: 'Bookshelf', category: 'Study', image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuWOnXOA1M3B7XfgBlJdzcWQuuwpVdQ0-_bA&s' }, price: '$199', description: 'Wooden bookshelf with adjustable shelves.' },
  { id: '20', name: 'Table Lamp', category: 'Study', image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0-O-lCrZ95FVFyK2A2d-n02qhPn4QPlqmWA&s' }, price: '$45', description: 'Stylish table lamp with dimming feature.' },
  { id: '21', name: 'Filing Cabinet', category: 'Study', image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTMdZibvhPJ2vfzmdHTSOOzr5hoxl_a0zK-A&s' }, price: '$279', description: 'Metal filing cabinet with lockable drawers.' },
];

export default function Study({ navigation }) {
  const [sortedProducts, setSortedProducts] = useState(studyProducts);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    sortProducts(sortOrder);
    addProductsToDatabase();
  }, [sortOrder]);

  const sortProducts = (order) => {
    const sorted = [...studyProducts].sort((a, b) => {
      const priceA = parseFloat(a.price.replace('$', ''));
      const priceB = parseFloat(b.price.replace('$', ''));
      return order === 'high-to-low' ? priceB - priceA : priceA - priceB;
    });
    setSortedProducts(sorted);
  };

  const addProductsToDatabase = () => {
    studyProducts.forEach(product => {
      fetch("https://appp-4c424-default-rtdb.firebaseio.com/Study.json", { // Updated path
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image.uri,
        }),
      })
      .then(response => response.json())
      .then(() => {
        console.log(`Product ${product.name} added to database.`);
      })
      .catch(error => {
        Alert.alert("Error", "There was an error adding products to the database. Please try again.");
        console.error(error);
      });
    });

    Alert.alert("Success", "All products added to the Study category in the database.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}></Text>
      </View>
      <ScrollView>
        <ProductList products={sortedProducts} navigation={navigation} />
      </ScrollView>
    </View>
  );
}

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
  picker: {
    width: 200,
    padding: 15,
  },
});
