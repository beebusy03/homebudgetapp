// BudgetEntryScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import { addBudgetEntry } from './actions';
import { useNavigation } from '@react-navigation/native';


const BudgetEntryScreen = ({ dispatch }) => {
  const [itemName, setItemName] = useState('');
  const [plannedAmount, setPlannedAmount] = useState('');
  const [actualAmount, setActualAmount] = useState('');
  const [category, setCategory] = useState('');
  const navigation = useNavigation();

  const handleSave = () => {
    // validations
    if (!category || (!itemName && category === 'Others') || !plannedAmount || !actualAmount) {
      Alert.alert('Error : ', 'All fields are mandatory. Please fill them out.');
      return;
    }

    const entry = {
      itemName: category !== 'Others' ? category : itemName,
      plannedAmount: parseFloat(plannedAmount),
      actualAmount: parseFloat(actualAmount),
    };

     dispatch(addBudgetEntry(entry));

    // Clear input fields after saving
    setItemName('');
    setPlannedAmount('');
    setActualAmount('');
    setCategory('');

    // Redirect to the listing screen
    navigation.navigate('BudgetEntryListing');
  }; 

  

  const handleShowItems = () => {
    navigation.navigate('BudgetEntryListing');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Budget Tracker</Text>
      <View style={styles.formContainer}>
        {/* Category dropdown */}
        <View>
          <Text style={styles.placeholder}>Select Category</Text>
          <Picker
            style={styles.input}
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Sports" value="Sports" />
            <Picker.Item label="Education" value="Education" />
            <Picker.Item label="Grocery" value="Grocery" />
            <Picker.Item label="Entertainment" value="Entertainment" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>

        
        {category === 'Others' && (
          <View>
            <Text style={styles.placeholder}>Other Category</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Other Category"
              value={itemName}
              onChangeText={(text) => setItemName(text)}
            />
          </View>
        )}

        {/* Planned Amount input */}
        <View>
          <Text style={styles.placeholder}>Planned Amount(Rs)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Planned Amount(Rs)"
            value={plannedAmount}
            onChangeText={(text) => setPlannedAmount(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />
        </View>

        {/* Actual Amount input */}
        <View>
          <Text style={styles.placeholder}>Actual Amount(Rs)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Actual Amount(Rs)"
            value={actualAmount}
            onChangeText={(text) => setActualAmount(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />
        </View>

      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.showItemsButton} onPress={handleShowItems}>
        <Text style={styles.buttonText}>Show Items</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#d2f5d2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textShadowColor: '#333', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  placeholder: {
    fontSize: 19,
    color: '#555',
    marginBottom: 15,
    fontWeight: 'bold', 
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  showItemsButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default connect()(BudgetEntryScreen);
