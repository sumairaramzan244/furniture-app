import React, { useState } from 'react';
import { Text, View, TextInput, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  async function buttonHandler() {
    // Reset errors
    setErrors({});

    // Basic validation
    let hasError = false;
    let newErrors = {};

    if (!username) {
      newErrors.email = "Email is required";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('Your firebase Auth key', { 
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
      const result = await response.json();

      if (result.idToken) {
        Alert.alert("Success", "Signup Successful");
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
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name <Text style={styles.required}>*</Text></Text>
          <TextInput
            placeholder="Enter name"
            style={[styles.input, errors.name && styles.errorInput]}
            // Remove if not needed
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
          <TextInput
            placeholder="Enter Email"
            style={[styles.input, errors.email && styles.errorInput]}
            value={username}
            onChangeText={setUsername}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.label}>Password <Text style={styles.required}>*</Text></Text>
          <TextInput
            placeholder="Enter password"
            style={[styles.input, errors.password && styles.errorInput]}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <Text style={styles.label}>Confirm Password <Text style={styles.required}>*</Text></Text>
          <TextInput
            placeholder="Confirm password"
            style={[styles.input, errors.confirmPassword && styles.errorInput]}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          <TouchableOpacity style={styles.button} onPress={buttonHandler}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>

          <View style={styles.rowContainer}>
            <Text style={styles.text}>Already have an account?</Text>
            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Login</Text>
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

export default Signup;