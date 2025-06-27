import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import { Picker } from '@react-native-picker/picker';

export default function AddRecipe() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const isValidUrl = (url) => {
    return (
      url.startsWith('https://res.cloudinary.com') ||
      url.startsWith('https://i.imgur.com')
    );
  };

  const handleAddRecipe = async () => {
    if (!title || !imageUrl || !category || !ingredients || !steps) {
      Alert.alert('❗ Please fill in all fields.');
      return;
    }

    if (!isValidUrl(imageUrl)) {
      Alert.alert('❗ Invalid image URL.', 'Please use a Cloudinary or Imgur link.');
      return;
    }

    try {
      await addDoc(collection(db, 'recipes'), {
        title,
        imageUrl,
        category,
        ingredients: ingredients.split(',').map((i) => i.trim()),
        steps,
      });

      Alert.alert('✅ Recipe added successfully!');
      
      // Clear inputs
      setTitle('');
      setImageUrl('');
      setCategory('');
      setIngredients('');
      setSteps('');
    } catch (error) {
      console.error('Error adding recipe:', error);
      Alert.alert('❌ Failed to add recipe. Try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#fff', flexGrow: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>➕ Add New Recipe</Text>

      <TextInput
        placeholder="Recipe Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Image URL (Cloudinary/Imgur)"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
      />

      {/* 🖼 Live Image Preview */}
      {imageUrl !== '' && isValidUrl(imageUrl) && (
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: '100%',
            height: 200,
            borderRadius: 10,
            marginBottom: 12,
            resizeMode: 'cover',
          }}
        />
      )}

      {/* 📦 Category Picker */}
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={{
          backgroundColor: '#f0f0f0',
          marginBottom: 12,
          borderRadius: 10,
        }}
      >
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Breakfast" value="Breakfast" />
        <Picker.Item label="Lunch" value="Lunch" />
        <Picker.Item label="Dessert" value="Dessert" />
        <Picker.Item label="Healthy" value="Healthy" />
        <Picker.Item label="Spicy" value="Spicy" />
      </Picker>

      <TextInput
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChangeText={setIngredients}
        style={styles.input}
      />

      <TextInput
        placeholder="Steps"
        value={steps}
        onChangeText={setSteps}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100 }]}
      />

      <TouchableOpacity
        onPress={handleAddRecipe}
        style={{
          backgroundColor: '#f39c12',
          padding: 14,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Submit Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = {
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
};
