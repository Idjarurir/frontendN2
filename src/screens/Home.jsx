// src/screens/Home.js
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { UserContext } from '../context/UserContext';
import config from '../config';
import axios from 'axios';

const Home = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!name || !email || !phone) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    axios.get(`${config.API_URL}/usuarios/`)
      .then(response => {
        const data = response.data;
        const user = data.find(u => u.name === name && u.email === email && u.phone === phone);
        if (user) {
          setUser(user);
          navigation.navigate('Admin');
        } else {
          setError('Usuário não encontrado.');
        }
      })
      .catch(error => {
        console.error('Erro ao autenticar usuário:', error);
        setError('Erro ao autenticar usuário: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem Vindo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title="Entrar"
        onPress={handleLogin}
        color="#6200EE"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default Home;
