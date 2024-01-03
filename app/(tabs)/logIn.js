import { StyleSheet, SafeAreaView } from 'react-native';

import LoginScreen from '../components/LoginScreen';

export default function Index() {
   return (
      <SafeAreaView style={styles.container}>
         <LoginScreen />
         {/* <Balance />
         <History /> */}
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 24,
      backgroundColor: 'white',
   },
});
