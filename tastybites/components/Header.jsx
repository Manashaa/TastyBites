import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>🍽️ TastyBites</Text>
      <Text style={styles.subtitle}>Find your next favorite recipe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#f5f2ef', 
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ca8150', 
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#3d1520', 
  },
  subtitle: {
    fontSize: 14,
    color: '#8d5535', 
    marginTop: 4,
  },
});
