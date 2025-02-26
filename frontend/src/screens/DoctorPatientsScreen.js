// DoctorPatientsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function DoctorPatientsScreen() {
  const [patientUsername, setPatientUsername] = useState('');
  const [code, setCode] = useState('');

  const handleRequestAccess = async () => {
    const res = await axios.post('http://127.0.0.1:8000/api/create-access/', {
      patient_username: patientUsername
    });
    alert(`Access code: ${res.data.code}`);
  };

  return (
    <View>
      <Text>Doctor's Patients</Text>
      <TextInput
        placeholder="Patient username"
        value={patientUsername}
        onChangeText={setPatientUsername}
      />
      <Button title="Request Access" onPress={handleRequestAccess} />
    </View>
  );
}
