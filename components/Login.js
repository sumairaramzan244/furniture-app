import React, { useState } from 'react';
import { Text, View, TextInput, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  async function buttonHandler() {
    // Reset errors
    setErrors({});

    // Basic validation
    let hasError = false;
    let newErrors = {};

    if (!username) {
      newErrors.username = "Username/Email is required";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("Your firebase Auth key", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
          returnSecureToken: true,
        }),
      });

      // Check for successful response
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      // Debugging statement
      console.log("API response:", result);

      if (result.idToken) {
        Alert.alert("Success", "Login Successfully");
        navigation.navigate('Home');
      } else {
        Alert.alert("Error", "Credentials do not match");
      }
      
    } catch (error) {
      console.error("Error Occurred", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  }

  return (
    <ImageBackground
      source={require('../assets/111.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username/Email <Text style={styles.required}>*</Text></Text>
          <TextInput
            placeholder="Enter username/Email"
            style={[styles.input, errors.username && styles.errorInput]}
            value={username}
            onChangeText={setUsername}
          />
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

          <Text style={styles.label}>Password <Text style={styles.required}>*</Text></Text>
          <TextInput
            placeholder="Enter password"
            style={[styles.input, errors.password && styles.errorInput]}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TouchableOpacity style={styles.button} onPress={buttonHandler}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.rowContainer}>
            <Text style={styles.text}>Create new account?</Text>
            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'darkgrey',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
  },
  button1: {
    backgroundColor: 'darkgrey',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    marginRight: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 0,
  },
});

export default Login;