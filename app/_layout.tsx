import { Stack } from 'expo-router';
import { ToastProvider } from '@/components/ui/toast';

export default function RootLayout() {
  return (
    <ToastProvider>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName="Welcome"
      />
    </ToastProvider>
  );
}
