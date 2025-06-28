import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const categories = ['Breakfast', 'Lunch', 'Dessert', 'Healthy', 'Spicy'];

export default function Categories() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📂 Categories</Text>

      <ScrollView contentContainerStyle={styles.list}>
        {categories.map((cat) => (
          <Link href={`/category/${cat}`} asChild key={cat}>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f2ef', // soft neutral background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3d1520',
  },
  list: {
    paddingBottom: 20,
  },
  categoryBox: {
    backgroundColor: '#ca8150',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
  },
  categoryText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
