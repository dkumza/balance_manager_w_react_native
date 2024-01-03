import { Tabs } from 'expo-router';

import { FontAwesome } from '@expo/vector-icons';
import { ExpProvider } from '../components/ExpContext';

const TabsLayout = () => {
   return (
      <ExpProvider>
         <Tabs>
            <Tabs.Screen
               name="logIn"
               options={{
                  headerTitle: 'Sign In',
                  title: 'Sign In',
                  headerStatusBarHeight: 1,
                  headerTitleAlign: 'center',
                  headerStyle: { backgroundColor: '#ccfbf1' },
                  tabBarStyle: { backgroundColor: '#ccfbf1' },
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
               name="index"
               options={{
                  headerTitle: 'Overview',
                  title: 'Overview',
                  headerStatusBarHeight: 1,
                  headerTitleAlign: 'center',
                  headerStyle: { backgroundColor: '#ccfbf1' },
                  tabBarStyle: { backgroundColor: '#ccfbf1' },
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
                  title: 'Manage',
                  headerStatusBarHeight: 1,
                  headerTitleAlign: 'center',
                  headerStyle: { backgroundColor: '#cffafe' },
                  tabBarStyle: { backgroundColor: '#cffafe', color: 'black' },
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
      </ExpProvider>
   );
};
export default TabsLayout;
