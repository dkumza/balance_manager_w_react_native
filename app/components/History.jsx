import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ExpContext } from './ExpContext';
import Expense from './Expense';

export default function History() {
   const { expenses } = useContext(ExpContext);

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
                  <Expense key={exp.id} exp={exp} />
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
});
