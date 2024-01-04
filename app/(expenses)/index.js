import { StyleSheet, SafeAreaView } from 'react-native';

import Balance from '../../components/Balance';
import History from '../../components/History';

export default function Index() {
   return (
      <SafeAreaView style={styles.container}>
         <Balance />
         <History />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 24,
      backgroundColor: '#f8fafc',
   },
});
