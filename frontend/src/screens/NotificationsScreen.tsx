// screens/NotificationsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configure how notifications behave when they arrive
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface NotificationsScreenProps {
  navigation: any; // or a more specific type if using react-navigation
}

export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const [reminderTime, setReminderTime] = useState<string>('');

  useEffect(() => {
    // Ask for iOS permission
    if (Platform.OS === 'ios') {
      Notifications.requestPermissionsAsync()
        .then(({ status }) => {
          if (status !== 'granted') {
            alert('Please enable notifications in iOS settings to receive reminders!');
          }
        })
        .catch(err => console.error('Permission error:', err));
    }
  }, []);

  const scheduleReminder = async () => {
    if (!reminderTime) {
      alert('Please enter a date/time, e.g. 2023-10-08 14:00');
      return;
    }

    const targetDate = new Date(reminderTime);
    if (isNaN(targetDate.getTime())) {
      alert('Invalid date/time format. Use YYYY-MM-DD HH:MM');
      return;
    }

    // Calculate how many seconds from now until that date/time
    const secondsUntil = (targetDate.getTime() - Date.now()) / 1000;
    if (secondsUntil <= 0) {
      alert('Time must be in the future!');
      return;
    }

    // IMPORTANT: Just pass { seconds, repeats } — do NOT pass 'type': 'timeInterval'
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reminder',
        body: 'It’s time for your scheduled event!',
      },
      trigger: {
        seconds: secondsUntil,
        repeats: false,
      },
    });

    alert('Reminder scheduled!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.label}>Enter a future date/time (YYYY-MM-DD HH:MM):</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 2023-10-08 14:00"
        placeholderTextColor="#888"
        value={reminderTime}
        onChangeText={setReminderTime}
      />
      <TouchableOpacity style={styles.button} onPress={scheduleReminder}>
        <Text style={styles.buttonText}>Schedule Reminder</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
        <Text style={styles.navButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
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
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
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
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navButton: {
    backgroundColor: '#ff8c00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
