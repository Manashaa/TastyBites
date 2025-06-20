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
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderBlockColor:'#ff8400',
    backgroundColor:'#331a00',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#ff8400',
    marginTop: 4,
  },
});

/* */