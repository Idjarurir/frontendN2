// src/screens/About.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const About = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Este projeto faz a autenticação, gravação, exclusão e edição de usuários.
      </Text>
      <Text style={[styles.text, styles.author]}>
        By <Text style={styles.italic}>Matheus Idjarurir</Text>
      </Text>
      <Button
        title="Ir para Home"
        onPress={() => navigation.navigate('Home')}
        color="#6200EE"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  author: {
    fontStyle: 'italic',
  },
  italic: {
    fontStyle: 'italic',
  },
});

export default About;
