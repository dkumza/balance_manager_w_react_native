import { useContext } from 'react';
import {
   StyleSheet,
   Text,
   View,
   FlatList,
   RefreshControl,
   ScrollView,
   Button,
   Pressable,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { ExpContext } from './ExpContext';
import Expense from './Expense';

import { Ionicons } from '@expo/vector-icons';

export default function History() {
   const { expenses, onRefresh, refreshing } = useContext(ExpContext);
   const navigation = useNavigation();

   return (
      <View style={styles.historyWrap}>
         <Pressable
            style={({ pressed }) => [
               {
                  backgroundColor: pressed ? '#b8e994' : '#d9f99d',
               },
               styles.addBtn,
            ]}
            onPress={() => {
               navigation.navigate('new');
            }}
         >
            <Ionicons name="add" size={24} color="black" />
         </Pressable>
         <Text style={{ paddingBottom: 5 }}>Transactions history</Text>
         {!expenses || expenses.length === 0 ? (
            <ScrollView
               contentContainerStyle={{
                  height: '100%',
                  alignContent: 'center',
                  alignItems: 'center',
               }}
               refreshControl={
                  <RefreshControl
                     refreshing={refreshing}
                     onRefresh={onRefresh}
                  />
               }
            >
               <View
                  style={{
                     flex: 1,
                     justifyContent: 'center',
                  }}
               >
                  <Text
                     style={{
                        textAlign: 'center',
                        fontSize: 14,
                        color: 'gray',
                     }}
                  >
                     New transactions appears here
                  </Text>
               </View>
            </ScrollView>
         ) : (
            <FlatList
               data={expenses}
               keyExtractor={(item) => item.id.toString()}
               renderItem={({ item }) => <Expense exp={item} />}
               contentContainerStyle={styles.histWrap}
               refreshControl={
                  <RefreshControl
                     refreshing={refreshing}
                     onRefresh={onRefresh}
                  />
               }
            />
         )}
      </View>
   );
}

const styles = StyleSheet.create({
   historyWrap: {
      marginTop: 30,
      marginBottom: 12,
      height: '64%',
   },
   histWrap: {
      gap: 5,
   },
   addBtn: {
      position: 'absolute',
      height: 50,
      width: 50,
      bottom: 30,
      right: 10,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      opacity: 0.7,
   },
});
