import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const dummyReminders = [
  { id: '1', type: 'medicine', description: 'Take Vitamin C', time: '08:00 AM' },
  { id: '2', type: 'appointment', description: 'Dentist Appointment', time: '02:00 PM' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.sectionTitle}>Daily Medicine Reminders</Text>
      <FlatList
        data={dummyReminders.filter(r => r.type === 'medicine')}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderCard}>
            <Text style={styles.reminderText}>{item.description}</Text>
            <Text style={styles.reminderTime}>{item.time}</Text>
          </View>
        )}
      />
      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      <FlatList
        data={dummyReminders.filter(r => r.type === 'appointment')}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderCard}>
            <Text style={styles.reminderText}>{item.description}</Text>
            <Text style={styles.reminderTime}>{item.time}</Text>
          </View>
        )}
      />
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Chatbot')}>
          <Text style={styles.navButtonText}>Chatbot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.navButtonText}>Notifications</Text>
        </TouchableOpacity>
      </View>
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
  sectionTitle: {
    fontSize: 24,
    color: '#00bfff',
    marginTop: 15,
    marginBottom: 10,
  },
  reminderCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ff8c00'
  },
  reminderText: {
    fontSize: 18,
    color: '#333',
  },
  reminderTime: {
    fontSize: 16,
    color: '#888',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 8,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
