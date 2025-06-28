import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f2ef', // Soft neutral background
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#3d1520', 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#8d5535',
  },
  textItem: {
    fontSize: 16,
    marginBottom: 4,
    color: '#3d1520', 
  },
});
