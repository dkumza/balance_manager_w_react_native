import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { ExpContext } from '../components/ExpContext';

export default function Messages() {
   const { messages } = useContext(ExpContext);

   if (messages.length === 0) return null;

   return (
      <View>
         {messages.map((msg) => (
            <Text key={msg.id} style={styles.msgWrap}>
               {msg.text}
            </Text>
         ))}
      </View>
   );
}
const styles = StyleSheet.create({
   msgWrap: {
      textAlign: 'center',
      color: '#1e293b',
      fontWeight: '300',
      fontSize: 18,
      paddingVertical: 10,
      marginHorizontal: 10,
      borderRadius: 5,
      //   backgroundColor: msg.type === 'success' ? '#d9f99d' : '#ef4444',
      backgroundColor: '#d9f99d',
      position: 'absolute',
      zIndex: 10,
      left: 0,
      right: 0,
   },
});
