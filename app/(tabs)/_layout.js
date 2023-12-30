import { Tabs } from 'expo-router';

import { FontAwesome } from '@expo/vector-icons';

const TabsLayout = () => {
   return (
      <Tabs>
         <Tabs.Screen
            name="index"
            options={{
               headerTitle: 'Balance Page',
               title: 'Balance',
               headerTitleAlign: 'center',
               headerStyle: { backgroundColor: '#f0f9ff' },
               tabBarIcon: ({ focused, color, size }) => (
                  <FontAwesome
                     name="balance-scale"
                     size={18}
                     color={focused ? '#2563eb' : 'gray'}
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="new"
            options={{
               headerTitle: 'Manage Expenses',
               title: 'Expenses',
               headerTitleAlign: 'center',
               headerStyle: { backgroundColor: '#f0f9ff' },
               tabBarIcon: ({ focused, color, size }) => (
                  <FontAwesome
                     name="money"
                     size={18}
                     color={focused ? '#2563eb' : 'gray'}
                  />
               ),
            }}
         />
      </Tabs>
   );
};
export default TabsLayout;
