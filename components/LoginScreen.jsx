import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

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

const LoginScreen = () => {
   return (
      <View style={styles.container}>
         <View style={styles.left}>
            <Text style={styles.title}>BUDGET APP</Text>
         </View>
         <View style={styles.right}>
            <View style={{ width: '100%' }}>
               <Text style={{ marginVertical: 5 }}>Email</Text>
               <TextInput
                  style={styles.txt1}
                  //   value={title}
                  //   onChangeText={setTitle}
                  maxLength={20}
               />
            </View>
            <View style={{ width: '100%' }}>
               <Text style={{ marginVertical: 5 }}>Password</Text>
               <TextInput
                  style={styles.txt1}
                  //   value={title}
                  //   onChangeText={setTitle}
                  maxLength={20}
               />
            </View>
            <Pressable
               //    onPress={handleSubmitEdit}
               style={({ pressed }) => [
                  {
                     backgroundColor: pressed ? '#67e8f9' : '#06b6d4',
                  },
                  styles.button,
               ]}
            >
               <Text style={styles.text}>Log In</Text>
            </Pressable>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#f8fafc',
   },
   left: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 36,
   },

   right: {
      flex: 1,
      //   borderWidth: 1,
      //   padding: 12,
      borderRadius: 15,
      width: '100%',
      backgroundColor: '#f8fafc',
      paddingVertical: 24,
      //   justifyContent: 'center',
      alignItems: 'center',
      //   position: 'absolute',
   },
   title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#06b6d4',
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
      marginTop: 24,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 18,
      // paddingHorizontal: 5,
      borderRadius: 10,
      elevation: 5,
      width: '100%',
   },
   text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
   },
});

export default LoginScreen;
