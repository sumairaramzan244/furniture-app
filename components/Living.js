import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ProductList from './Product';

const livingProducts = [
  { id: '6', name: 'Sofa Set', category: 'Living', image: { uri: 'https://media.designcafe.com/wp-content/uploads/2020/09/23161523/sofa-set-designs-for-small-living-room.jpg' }, price: '$799', description: 'Comfortable and stylish sofa set.' },
  { id: '7', name: 'Modern Sofa', category: 'Living', image: { uri: 'https://media.istockphoto.com/id/1285065780/photo/furniture-showroom-with-plants-spotlights-and-brick-wall.jpg?s=612x612&w=0&k=20&c=5X2jXOu4kAEW978_fNmdLGcnyqFjyl06Z-WDlX_FDVU=' }, price: '$299', description: 'Comfortable modern sofa.' },
  { id: '8', name: 'Coffee Table', category: 'Living', image: { uri: 'https://www.stonegableblog.com/wp-content/uploads/2024/02/1-HOW-TO-DECORATE-A-COFFEE-TABLE-15.jpg' }, price: '$99', description: 'Stylish coffee table.' },
  { id: '9', name: 'Recliner', category: 'Living', image: { uri: 'https://www.tlcinteriors.com.au/wp-content/uploads/2020/07/large-black-leather-sectional-sofa-with-recliners.jpg' }, price: '$299', description: 'Comfortable recliner.' },
  { id: '10', name: 'TV Stand', category: 'Living', image: { uri: 'https://qph.cf2.quoracdn.net/main-qimg-da3c4b6c7878870f6eac281c369e9dad-lq' }, price: '$199', description: 'Modern TV stand.' },
  { id: '11', name: 'Bookshelf', category: 'Living', image: { uri: 'https://i.pinimg.com/736x/42/35/c2/4235c2da1ed768c042e06d37ae150b6f.jpg' }, price: '$199', description: 'Spacious bookshelf.' },
];

export default function Living({ navigation }) {
  const [sortedProducts, setSortedProducts] = useState(livingProducts);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    addProductsToDatabase();
  }, []);

  useEffect(() => {
    sortProducts(sortOrder);
  }, [sortOrder]);

  const sortProducts = (order) => {
    const sorted = [...livingProducts].sort((a, b) => {
      const priceA = parseFloat(a.price.replace('$', ''));
      const priceB = parseFloat(b.price.replace('$', ''));
      return order === 'high-to-low' ? priceB - priceA : priceA - priceB;
    });
    setSortedProducts(sorted);
  };

  const addProductsToDatabase = () => {
    livingProducts.forEach(product => {
      fetch("https://neww-81b40-default-rtdb.firebaseio.com/Living.json", {
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
        console.log("added to database.");
      })
      .catch(error => {
        Alert.alert("Error", "There was an error adding products to the database. Please try again.");
        console.error(error);
      });
    });

 //   Alert.alert("Success", "All products added to the Living category in the database.");
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