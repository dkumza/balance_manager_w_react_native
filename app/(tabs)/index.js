import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

const BASE_URL =
   Platform.OS === 'android'
      ? 'http://10.0.2.2:3000/api'
      : 'http://localhost:3000/api';

let today = new Date();
let todayDate =
   today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

export default function Index() {
   const [expenses, setExpenses] = useState(null);

   useEffect(() => {
      // fetch expenses from DB on page load
      axios
         .get(`${BASE_URL}/exp_all`)
         .then((res) => {
            if (res.data.length === 0) return;
            let formattedExpenses = res.data.map((expense) => {
               let date = new Date(expense.date);
               let formattedDate = date.toISOString().split('T')[0];
               return { ...expense, date: formattedDate };
            });
            setExpenses(formattedExpenses);
         })
         .catch((err) => {
            console.warn('ERROR: ', err);
         });
   }, []);

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView showsVerticalScrollIndicator={false}>
            {/* Information about balance */}
            <View>
               <View style={styles.totalWrap}>
                  <Text style={styles.totalTxt}>€ 2000</Text>
               </View>
               <View style={styles.diffWrap}>
                  <View style={styles.diffWrap1}>
                     <Text style={styles.diffTxt}>€ -1000</Text>
                     <Text style={styles.diffTxt1}>Total Spent</Text>
                  </View>
                  <View style={styles.diffWrap1}>
                     <Text style={styles.diffTxt}>€ 2000</Text>
                     <Text style={styles.diffTxt2}>Total Income</Text>
                  </View>
               </View>
            </View>
            <View style={styles.historyWrap}>
               <Text>Transactions history</Text>
               {!expenses && (
                  <View>
                     <Text>No data</Text>
                  </View>
               )}
               {expenses && (
                  <View style={styles.histWrap}>
                     {expenses.map((exp) => (
                        <View key={exp.id} style={styles.liWrap}>
                           <View></View>
                           <View>
                              <View>
                                 <Text>{exp.cat_id}</Text>
                                 <Text>{exp.date}</Text>
                              </View>
                           </View>
                           <View>
                              <Text>{exp.amount} EUR</Text>
                           </View>
                        </View>
                     ))}
                  </View>
               )}
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#f8fafc',
   },
   totalWrap: {
      borderWidth: 1,
      borderColor: '#e2e8f0',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      borderRadius: 5,
      padding: 10,
   },
   totalTxt: {
      fontSize: 64,
   },

   diffWrap: {
      flexDirection: 'row',
      alignItems: 'center',

      gap: 10,
   },
   diffWrap1: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#e2e8f0',
      borderRadius: 5,
      padding: 10,
   },

   diffTxt: {
      fontSize: 38,
   },
   diffTxt1: {
      color: '#f43f5e',
      fontWeight: '500',
   },
   diffTxt2: {
      color: '#84cc16',
      fontWeight: '500',
   },
   historyWrap: {
      marginTop: 10,
   },
   histWrap: {
      // borderWidth: 1,
      gap: 10,
   },
   liWrap: {
      borderWidth: 1,
      padding: 10,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
});
