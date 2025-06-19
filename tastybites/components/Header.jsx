import { Text, View } from 'react-native';

export default function Header() {
  return (
    <View className="bg-orange-100 py-4 px-4 mb-4 rounded-xl">
      <Text className="text-3xl font-bold text-orange-700 text-center">🍽️ TastyBites</Text>
    </View>
  );
}
