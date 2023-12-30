import { Link } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
   return (
      <SafeAreaView className={styles.container}>
         <Text>Home page</Text>
         {/* <Link href="/new">New</Link> */}
      </SafeAreaView>
   );
}

const styles = {
   container: '',
};
