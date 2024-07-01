import React, { useState, useEffect, useContext } from 'react';
import { View, Button, FlatList, TextInput, StyleSheet, Text } from 'react-native'; // Remova 'Text' daqui
import { UserContext } from '../context/UserContext';
import config from '../config';

const Admin = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
  const [editUser, setEditUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch(`${config.API_URL}/usuarios`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao carregar usuários:', error));
  };

  const handleAddUser = () => {
    fetch(`${config.API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, data]);
        setNewUser({ name: '', email: '', phone: '' });
      })
      .catch(error => console.error('Erro ao adicionar usuário:', error));
  };

  const handleDeleteUser = (id) => {
    fetch(`${config.API_URL}/usuarios/${id}`, {
      method: 'DELETE'
    })
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error('Erro ao excluir usuário:', error));
  };

  const handleEditUser = () => {
    if (!editUser) {
      console.error('Nenhum usuário em edição.');
      return;
    }

    fetch(`${config.API_URL}/usuarios/${editUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editUser)
    })
      .then(response => response.json())
      .then(updatedUser => {
        const updatedUsers = users.map(user => {
          if (user.id === updatedUser.id) {
            return updatedUser;
          }
          return user;
        });
        setUsers(updatedUsers);
        setEditUser(null);
        setEditing(false);
      })
      .catch(error => console.error('Erro ao editar usuário:', error));
  };

  const renderItem = ({ item }) => (
    <View style={styles.user}>
      <Text>{item.name} ({item.email})</Text>
      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={() => { setEditUser(item); setEditing(true); }} color="#FFA500" />
        <View style={{ width: 10 }} />
        <Button title="Excluir" onPress={() => handleDeleteUser(item.id)} color="#E53935" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {editing && editUser ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={editUser.name}
            onChangeText={name => setEditUser({ ...editUser, name })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={editUser.email}
            onChangeText={email => setEditUser({ ...editUser, email })}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={editUser.phone}
            onChangeText={phone => setEditUser({ ...editUser, phone })}
            keyboardType="phone-pad"
          />
          <View style={styles.buttonContainer}>
            <Button title="Salvar" onPress={handleEditUser} color="#6200EE" />
            <View style={{ width: 10 }} />
            <Button title="Cancelar" onPress={() => { setEditUser(null); setEditing(false); }} color="#E53935" />
          </View>
        </View>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={newUser.name}
            onChangeText={name => setNewUser({ ...newUser, name })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newUser.email}
            onChangeText={email => setNewUser({ ...newUser, email })}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={newUser.phone}
            onChangeText={phone => setNewUser({ ...newUser, phone })}
            keyboardType="phone-pad"
          />
          <Button
            title="Adicionar Usuário"
            onPress={handleAddUser}
            color="#6200EE"
          />
          <FlatList
            data={users}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
          <Button
            title="Autenticar Usuário"
            onPress={() => navigation.navigate('Authentication')}
            color="#6200EE"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editContainer: {
    marginBottom: 20,
  },
});

export default Admin;
