import { Tabs } from 'expo-router';

import { FontAwesome } from '@expo/vector-icons';

const TabsLayout = () => {
   return (
      <Tabs>
         <Tabs.Screen
            name="index"
            options={{
               headerTitle: 'Balance',
               title: 'Balance',
               headerStatusBarHeight: 1,
               headerTitleAlign: 'center',
               headerStyle: { backgroundColor: '#a7f3d0' },
               tabBarStyle: { backgroundColor: '#a7f3d0' },
               tabBarLabelStyle: { color: 'black' },
               tabBarIcon: ({ focused, color, size }) => (
                  <FontAwesome
                     name="balance-scale"
                     size={18}
                     color={focused ? 'black' : 'gray'}
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="new"
            options={{
               headerTitle: 'Manage Expenses',
               title: 'Expenses',
               headerStatusBarHeight: 1,
               headerTitleAlign: 'center',
               headerStyle: { backgroundColor: '#99f6e4' },
               tabBarStyle: { backgroundColor: '#99f6e4', color: 'black' },
               tabBarLabelStyle: { color: 'black' },
               tabBarIcon: ({ focused, color, size }) => (
                  <FontAwesome
                     name="money"
                     size={18}
                     color={focused ? 'black' : 'gray'}
                  />
               ),
            }}
         />
      </Tabs>
   );
};
export default TabsLayout;
