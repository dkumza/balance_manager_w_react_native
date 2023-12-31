import {
   StyleSheet,
   Text,
   View,
   SafeAreaView,
   ScrollView,
   RefreshControl,
} from 'react-native';

import Balance from '../components/Balance';
import History from '../components/History';
import { ExpContext } from '../components/ExpContext';
import { useContext } from 'react';

export default function Index() {
   const { onRefresh, refreshing } = useContext(ExpContext);

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
         >
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
