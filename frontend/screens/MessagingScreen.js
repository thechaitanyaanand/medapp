import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function MessagingScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Simulated incoming messages every 10 seconds.
    const interval = setInterval(() => {
      setMessages(prev => [
        ...prev,
        { id: String(prev.length + 1), text: 'New message received!' }
      ]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { id: String(messages.length + 1), text: input }]);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messaging</Text>
      <ScrollView style={styles.chatContainer}>
        {messages.map(message => (
          <View key={message.id} style={styles.messageCard}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
        <Text style={styles.navButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#ff8c00',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 15,
  },
  messageCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff8c00',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ff8c00',
  },
  sendButton: {
    backgroundColor: '#ff8c00',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navButton: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
