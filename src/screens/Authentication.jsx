// src/screens/Authentication.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import config from '../config';

const Authentication = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const handleAuthentication = () => {
    fetch(`${config.API_URL}/usuarios`)
      .then(response => response.json())
      .then(data => {
        const user = data.find(u => u.name === name);
        setStatus(user ? 'Usuário Ativo' : 'Usuário não encontrado');
      })
      .catch(error => console.error('Erro ao autenticar usuário:', error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <Button
        title="Verificar"
        onPress={handleAuthentication}
        color="#6200EE"
      />
      <Text style={styles.status}>{status}</Text>
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
  status: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Authentication;
