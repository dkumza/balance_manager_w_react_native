import { Link } from 'expo-router';
import { Text, View, Pressable } from 'react-native';

export default function New() {
   return (
      <View>
         <Text className="">New Page</Text>
         {/* <Link href="/">Home</Link> */}
         {/* <Link href="/" asChild>
            <Pressable>
               <Text>Home</Text>
            </Pressable>
         </Link> */}
      </View>
   );
}
