import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BASE_URL =
   Platform.OS === 'android'
      ? 'http://10.0.2.2:3000/api'
      : 'http://localhost:3000/api';

let today = new Date();
let todayDate =
   today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

export default function History() {
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
      <View style={styles.historyWrap}>
         <Text style={{ paddingBottom: 5 }}>Transactions history</Text>
         {!expenses && (
            <View>
               <Text>No data</Text>
            </View>
         )}
         {expenses && (
            <View style={styles.histWrap}>
               {expenses.map((exp) => (
                  <View key={exp.id} style={styles.liWrap}>
                     <View style={styles.liLeft}>
                        <View>
                           <Text>ICON</Text>
                        </View>

                        <View style={styles.li1}>
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
   );
}
const styles = StyleSheet.create({
   historyWrap: {
      marginTop: 30,
      marginBottom: 12,
   },
   histWrap: {
      gap: 5,
   },
   liWrap: {
      borderColor: '#e2e8f0',
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: '#94a3b8',
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
   },
   liLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
   },
});
