import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native';

const shadow = {
   borderWidth: 1,
   borderRadius: 10,
   borderColor: '#e2e8f0',
   backgroundColor: 'white',
   shadowColor: '#94a3b8',
   shadowOffset: {
      width: 0,
      height: 2,
   },
   shadowOpacity: 0.1,
   shadowRadius: 4,
   elevation: 5,
};

export default function New() {
   const [selectedLanguage, setSelectedLanguage] = useState();
   return (
      <View style={styles.container}>
         <View>
            <Text style={{ marginVertical: 5 }}>Select category</Text>
            <View
               style={{
                  ...shadow,
               }}
            >
               <Picker
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                     setSelectedLanguage(itemValue)
                  }
               >
                  <Picker.Item label="Food" value="1" />
                  <Picker.Item label="House" value="2" />
                  <Picker.Item label="Health" value="3" />
                  <Picker.Item label="Salary" value="4" />
               </Picker>
            </View>
         </View>
         <View>
            <Text style={{ marginVertical: 5 }}>Short comment</Text>
            <TextInput style={styles.txt1} />
         </View>
         <View style={{ flexDirection: 'row', gap: 5 }}>
            <View style={{ flex: 1 }}>
               <Text style={{ marginVertical: 5 }}>Enter Amount</Text>
               <TextInput style={styles.txt1} />
            </View>
            <View style={{ flex: 2 }}>
               <Text style={{ marginVertical: 5 }}>Pick date</Text>
               <TextInput style={styles.txt1} />
            </View>
         </View>
         <View
            style={{
               alignItems: 'center',
               marginVertical: 30,
            }}
         >
            <Pressable
               // onPress={handleSubmit}
               style={({ pressed }) => [
                  {
                     backgroundColor: pressed ? '#54c2ff' : '#418fff',
                  },
                  styles.button,
               ]}
            >
               <Text style={styles.text}>Submit</Text>
            </Pressable>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
      margin: 0,
      gap: 5,
      backgroundColor: '#f8fafc',
   },
   txt1: {
      height: 53.5,
      fontSize: 16,
      paddingHorizontal: 18,
      ...shadow,
   },
   button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 10,
      elevation: 3,
      width: '50%',
   },

   text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
   },
});
