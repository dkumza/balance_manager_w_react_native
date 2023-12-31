import { ExpProvider } from '../components/ExpContext';
import Input from '../components/Input';

export default function New() {
   return (
      <ExpProvider>
         <Input />
      </ExpProvider>
   );
}
