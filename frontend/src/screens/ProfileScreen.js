import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function ProfileScreen({ navigation }) {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    // TODO: Fetch from backend if needed. Simulating data here:
    setDocuments([
      { id: '1', title: 'Blood Test Report', file: 'http://example.com/doc1' },
      { id: '2', title: 'X-Ray Scan', file: 'http://example.com/doc2' },
    ]);
  };

  const handleUploadDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      // In a real app, you'd upload to your backend here.
      const newDoc = { id: String(documents.length + 1), title: result.name, file: result.uri };
      setDocuments([...documents, newDoc]);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity style={styles.button} onPress={handleUploadDocument}>
        <Text style={styles.buttonText}>Add Document</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Medical Documents:</Text>
      <FlatList
        data={documents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.documentCard}>
            <Text style={styles.documentTitle}>{item.title}</Text>
            <Text style={styles.documentLink}>{item.file}</Text>
          </View>
        )}
      />
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
  button: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    color: '#00bfff',
    marginBottom: 10,
  },
  documentCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff8c00',
    marginBottom: 10,
  },
  documentTitle: {
    fontSize: 18,
    color: '#333',
  },
  documentLink: {
    fontSize: 16,
    color: '#00bfff',
  },
  navButton: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
