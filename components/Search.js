import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

function Search({ navigation }) {
  const [searchInput, setSearchInput] = useState('');

  // Handle navigation based on search input
  const handlePress = () => {
    // Convert search input to title case
    const formattedInput = searchInput.charAt(0).toUpperCase() + searchInput.slice(1).toLowerCase();
    
    // Navigate to the corresponding screen if it exists
    navigation.navigate(formattedInput);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.input}
        value={searchInput}
        onChangeText={setSearchInput}
      />

      {searchInput.trim().length > 0 && (
        <TouchableOpacity
          onPress={handlePress}
          style={styles.resultItem}
        >
          <Text style={styles.resultText}>Go to {searchInput}</Text>
        </TouchableOpacity>
      )}

      {searchInput.trim().length === 0 && (
        <Text style={styles.noResults}>Please enter a category to search</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultText: {
    fontSize: 18,
    color: 'black',
  },
  noResults: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Search;
