import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#fff" />
      <Slot />
    </>
  );
}
