import { StyleSheet, Text, View } from 'react-native';
export default function Balance() {
   return (
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
   );
}
const styles = StyleSheet.create({
   totalWrap: {
      marginTop: 30,
      borderWidth: 1,
      borderColor: '#e2e8f0',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      borderRadius: 10,
      padding: 10,
      backgroundColor: 'white',
      shadowColor: '#94a3b8',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
   },
   totalTxt: {
      fontSize: 64,
      color: '#334155',
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
      borderRadius: 10,
      padding: 10,
      backgroundColor: 'white',
      shadowColor: '#94a3b8',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
   },

   diffTxt: {
      fontSize: 38,
      color: '#334155',
   },
   diffTxt1: {
      color: '#f43f5e',
      fontWeight: '500',
   },
   diffTxt2: {
      color: '#84cc16',
      fontWeight: '500',
   },
});
