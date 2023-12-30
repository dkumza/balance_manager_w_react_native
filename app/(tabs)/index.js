import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import Balance from '../components/Balance';
import History from '../components/History';

export default function Index() {
   return (
      <SafeAreaView style={styles.container}>
         <ScrollView showsVerticalScrollIndicator={false}>
            {/* Information about balance */}
            <Balance />
            <History />
         </ScrollView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // padding: 24,
      paddingHorizontal: 24,
      backgroundColor: '#f8fafc',
   },
});
