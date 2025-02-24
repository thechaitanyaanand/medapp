import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const dummyPatients = [
  { id: '1', username: 'patient1' },
  { id: '2', username: 'patient2' },
];

export default function PatientsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patients</Text>
      <FlatList
        data={dummyPatients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.patientCard}
            onPress={() => navigation.navigate('PatientProfile', { username: item.username })}
          >
            <Text style={styles.patientText}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => {/* TODO: Add Patient Flow */}}>
        <Text style={styles.buttonText}>Add Patient</Text>
      </TouchableOpacity>
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
  patientCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff8c00',
    marginBottom: 10,
  },
  patientText: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
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
