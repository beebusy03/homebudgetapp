import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const BudgetEntryListingScreen = ({ entries }) => {
  const navigation = useNavigation();

  const handleGoToBudgetEntry = () => {
    navigation.navigate('BudgetEntry');
  };

  const renderBudgetEntry = ({ item }) => (
    <View style={styles.entryContainer}>
      <Text style={styles.itemName}>{item.itemName}</Text>
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Planned Amount:</Text>
        <Text style={styles.amountValue}>{`${item.plannedAmount.toFixed(2)}`}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Actual Amount:</Text>
        <Text style={styles.amountValue}>{`${item.actualAmount.toFixed(2)}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Overview</Text>
      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderBudgetEntry}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleGoToBudgetEntry}>
        <Text style={styles.addButtonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#d2f5d2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  entryContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3498db',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  amountLabel: {
    fontSize: 16,
    color: '#555',
  },
  amountValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({
  entries: state.entries,
});

export default connect(mapStateToProps)(BudgetEntryListingScreen);
