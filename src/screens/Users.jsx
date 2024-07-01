// src/screens/Users.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import config from '../config';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${config.API_URL}/usuarios`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao carregar usuários:', error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.user}>
            <Text>{item.name} ({item.email})</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  user: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Users;
