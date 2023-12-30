import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { FontAwesome } from '@expo/vector-icons';

import { useState } from 'react';
import {
   Text,
   View,
   TextInput,
   Pressable,
   StyleSheet,
   SafeAreaView,
   Button,
} from 'react-native';

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

let today = new Date();
let todayDate =
   today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

export default function New() {
   const [selectedLanguage, setSelectedLanguage] = useState();
   const [date, setDate] = useState(new Date(1598051730000));
   const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);

   const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
   };

   const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
   };

   const showDatepicker = () => {
      showMode('date');
   };

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
               <Pressable
                  onPress={showDatepicker}
                  style={({ pressed }) => [
                     {
                        backgroundColor: pressed ? '#54c2ff' : '#418fff',
                     },
                     styles.txt1,
                  ]}
               >
                  {show && (
                     <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                     />
                  )}
                  <View
                     style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                     }}
                  >
                     <Text style={styles.textDate}>{todayDate}</Text>
                     <FontAwesome name="calendar" size={12} color="black" />
                  </View>
               </Pressable>
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
      // alignItems: 'center',
      justifyContent: 'center',
      height: 53.5,
      fontSize: 16,
      paddingHorizontal: 18,
      ...shadow,
   },

   button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      // paddingHorizontal: 5,
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
   textDate: {
      fontSize: 16,
      lineHeight: 21,
      // fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
   },
});
