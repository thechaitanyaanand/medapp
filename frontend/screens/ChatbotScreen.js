import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function ChatbotScreen({ navigation }) {
  const [question, setQuestion] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleAsk = async () => {
    try {
      // Replace with your actual backend endpoint:
      const res = await axios.post('http://127.0.0.1:8000/api/chatbot/', { question });
      setResponseData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatbot</Text>
      <TextInput
        style={styles.input}
        placeholder="Ask a question..."
        placeholderTextColor="#888"
        value={question}
        onChangeText={setQuestion}
      />
      <TouchableOpacity style={styles.button} onPress={handleAsk}>
        <Text style={styles.buttonText}>Ask</Text>
      </TouchableOpacity>
      {responseData && (
        <ScrollView style={styles.responseContainer}>
          <Text style={styles.responseTitle}>Answer:</Text>
          <Text style={styles.responseText}>{responseData.answer}</Text>
          {responseData.links && responseData.links.map((link, index) => (
            <Text key={index} style={styles.link}>{link}</Text>
          ))}
        </ScrollView>
      )}
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
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ff8c00',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  responseContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff8c00',
    marginBottom: 15,
    maxHeight: 200,
  },
  responseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
  link: {
    fontSize: 16,
    color: '#00bfff',
    textDecorationLine: 'underline',
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
