import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const getCategoryInfo = (category) => {
   switch (category) {
      case '1':
         return [
            <Ionicons name="fast-food-outline" size={24} color="black" />,
            'Food',
         ];
      case '2':
         return [
            <Ionicons name="construct-outline" size={24} color="black" />,
            'House',
         ];
      case '3':
         return [
            <Ionicons name="heart-outline" size={24} color="black" />,
            'Health',
         ];
      default:
         return [
            <Ionicons name="md-card-outline" size={24} color="black" />,
            'Salary',
         ];
   }
};

export default function Expense({ exp }) {
   const iconClass = getCategoryInfo(exp.cat_id);
   return (
      <View key={exp.id} style={styles.liWrap}>
         <View style={styles.liLeft}>
            <View>
               <Text>{iconClass[0]}</Text>
            </View>

            <View style={styles.li1}>
               <View style={styles.li2}>
                  <Text>{iconClass[1]}</Text>
                  <Text style={{ color: '#94a3b8', fontSize: 12 }}>
                     {exp.date}
                  </Text>
               </View>
               <Text>{exp.comment}</Text>
            </View>
         </View>
         <View>
            <Text
               style={
                  exp.amount > 0 ? { color: '#84cc16' } : { color: '#f43f5e' }
               }
            >
               {exp.amount} EUR
            </Text>
         </View>
      </View>
   );
}
const styles = StyleSheet.create({
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
   li1: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   li2: {
      width: 80,
   },
});
