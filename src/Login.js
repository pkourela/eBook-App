import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, TextInput  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        // const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace("Home")
              }
            })
        
            return unsubscribe
    }, [])

    const handleSignUp = () => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Signup OK');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }

    const handleLogin = () => {
        // const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    }

  return (
    <KeyboardAvoidingView
        style={styles.loginContainer}
        behavior='padding'
    >   
      <Text style={styles.headerText}>Πτυχιακή Εργασία</Text>  
      <View style={styles.inputContainer}>
        <TextInput
            placeholder='Email'
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
        />
        <TextInput
            placeholder='Password'
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
        />
      </View>

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
            onPress={handleLogin}
            style={styles.buttonContainer}
        >
            <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={handleSignUp}
            style={styles.buttonContainer}
        >
            <Text style={styles.button}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}



const styles = StyleSheet.create({
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        
        
    },
    button: {
        backgroundColor: 'white',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        paddingHorizontal: 15, 
        paddingVertical: 10,
        textAlign: 'center',
        borderWidth: 1,
        fontSize: 15,
        fontWeight: 'bold'
    },
    buttonsWrapper: {
        marginTop: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        paddingHorizontal: 15, 
        paddingVertical: 10,
        borderRadius: 10, 
        marginTop: 5
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30
      },
})

export default LoginScreen