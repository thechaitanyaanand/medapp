import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PatientProfileScreen({ route, navigation }) {
  const { username } = route.params;
  const dummySchedule = [
    { id: '1', medicine: 'Medicine A', time: '08:00 AM' },
    { id: '2', medicine: 'Medicine B', time: '02:00 PM' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{username}'s Profile</Text>
      <Text style={styles.subtitle}>Current Medicine Schedule:</Text>
      {dummySchedule.map((item) => (
        <View key={item.id} style={styles.scheduleCard}>
          <Text style={styles.scheduleText}>
            {item.medicine} at {item.time}
          </Text>
        </View>
      ))}
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Chatbot')}>
        <Text style={styles.navButtonText}>Open Chatbot</Text>
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
  subtitle: {
    fontSize: 24,
    color: '#00bfff',
    marginBottom: 15,
  },
  scheduleCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff8c00',
    marginBottom: 10,
  },
  scheduleText: {
    fontSize: 18,
    color: '#333',
  },
  navButton: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
