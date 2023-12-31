import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { FontAwesome } from '@expo/vector-icons';

import { useContext, useState } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

import { ExpContext } from '../components/ExpContext';
import Messages from './Messages';

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

export default function Input() {
   const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);

   const {
      cat,
      setCat,
      amount,
      setAmount,
      title,
      setTitle,
      date,
      setDate,
      todayDate,
      submitHandler,
      editing,
      handleSubmitEdit,
      handleCancel,
      handleAlert,
      allCats,
      setAllCats,
   } = useContext(ExpContext);

   const navigation = useNavigation();

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
         <Messages />
         <View>
            <Text style={{ marginVertical: 5 }}>Select cat</Text>
            <View
               style={{
                  ...shadow,
               }}
            >
               <Picker
                  selectedValue={cat}
                  onValueChange={(itemValue, itemIndex) => setCat(itemValue)}
               >
                  {allCats &&
                     allCats.map((item) => (
                        <Picker.Item
                           key={item.cat_id}
                           label={item.cat_name}
                           value={item.cat_id}
                        />
                     ))}
               </Picker>
            </View>
         </View>
         <View>
            <Text style={{ marginVertical: 5 }}>Short comment</Text>
            <TextInput
               style={styles.txt1}
               value={title}
               onChangeText={setTitle}
               maxLength={20}
            />
         </View>
         <View style={{ flexDirection: 'row', gap: 5 }}>
            <View style={{ flex: 1 }}>
               <Text style={{ marginVertical: 5 }}>Enter Amount</Text>
               <TextInput
                  style={styles.txt1}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
               />
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
                  <View style={styles.calWrap}>
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
            {!editing && (
               <Pressable
                  onPress={submitHandler}
                  style={({ pressed }) => [
                     {
                        backgroundColor: pressed ? '#54c2ff' : '#418fff',
                     },
                     styles.button,
                  ]}
               >
                  <Text style={styles.text}>Submit</Text>
               </Pressable>
            )}
            {editing && (
               <View style={styles.editWrap}>
                  <Pressable
                     onPress={handleSubmitEdit}
                     style={({ pressed }) => [
                        {
                           backgroundColor: pressed ? '#bef264' : '#84cc16',
                        },
                        styles.button,
                     ]}
                  >
                     <Text style={styles.text}>Confirm</Text>
                  </Pressable>
                  <View style={styles.editWrap2}>
                     <Pressable
                        onPress={handleAlert}
                        style={({ pressed }) => [
                           {
                              backgroundColor: pressed ? '#fb7185' : '#f43f5e',
                           },
                           styles.button,
                        ]}
                     >
                        <Text style={styles.text}>Delete</Text>
                     </Pressable>
                     <Pressable
                        onPress={() => {
                           handleCancel();
                           navigation.navigate('index');
                        }}
                        style={({ pressed }) => [
                           {
                              backgroundColor: pressed ? '#fcd34d' : '#fbbf24',
                           },
                           styles.button,
                        ]}
                     >
                        <Text style={styles.text}>Cancel</Text>
                     </Pressable>
                  </View>
               </View>
            )}
         </View>
      </View>
   );
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 24,
      // marginTop: 10,
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
      paddingVertical: 18,
      // paddingHorizontal: 5,
      borderRadius: 10,
      elevation: 5,
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
      letterSpacing: 0.25,
      color: 'black',
   },
   editWrap: {
      alignItems: 'center',
      gap: 10,
      width: '100%',
      // flexDirection: 'row',
   },
   editWrap2: {
      flexDirection: 'row',
      gap: 10,
   },
   calWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
});
