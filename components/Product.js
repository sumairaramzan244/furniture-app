import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProductList({ products, navigation }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = async (product) => {
    let updatedFavorites = [];
    let found = false;

    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].id === product.id) {
        found = true;
      } else {
        updatedFavorites.push(favorites[i]);
      }
    }

    if (!found) {
      updatedFavorites.push(product);

      try {
        await fetch("https://appp-4c424-default-rtdb.firebaseio.com/Wishlist.json", { // Updated path
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
        });
        console.log(`Product ${product.name} added to wishlist in database.`);
      } catch (error) {
        Alert.alert("Error", "There was an error adding the product to the wishlist. Please try again.");
        console.error(error);
      }
    }

    setFavorites(updatedFavorites);
    console.log('Updated favorites:', updatedFavorites); // Debugging line
  };

  const getHeartColor = (product) => {
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].id === product.id) {
        return 'red';
      }
    }
    return 'grey';
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => '' + item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <View style={styles.productContainer}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.iconButton}>
                <FontAwesome name="heart" size={30} color={getHeartColor(item)} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          console.log('Navigating to WishList with favorites:', favorites); // Debugging line
          navigation.navigate('wishList', { favorite: favorites });
        }}
        style={styles.wishlistButton}
      >
        <Text style={styles.wishlistButtonText}>Go to Wishlist</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 150,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  iconButton: {
    marginLeft: 10,
  },
  wishlistButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  wishlistButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
