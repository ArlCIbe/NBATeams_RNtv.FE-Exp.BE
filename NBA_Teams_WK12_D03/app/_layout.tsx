/*Describe and Define:
- context provider: component allowing you to pass data/state through component tree w/o having to pass props manually at every level
*/
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
//ThemeProvider applies themes to its context
import { useFonts } from 'expo-font';//allows fonts to load asynchronously
import { Stack } from 'expo-router';//defines app's routing structure
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout: React.FC = () => 
{
  const colorScheme = useColorScheme();//accesses user's prefeerred color scheme
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'), });;

  useEffect(() => {

    if (loaded) 
    { 
      SplashScreen.hideAsync(); 
    }
  }, [loaded]);

  if (!loaded) 
  {
    return null;
  }

  return(
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default RootLayout;