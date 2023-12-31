import axios from 'axios';
import { createContext, useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';

export const ExpContext = createContext();

let BASE_URL;
// check if connecting from local pc or from physical device
BASE_URL = 'http://10.0.2.2:3000/api'; // if working on pc
// BASE_URL = `http://192.168.32.84:3000/api`; // if working on physical device

export const ExpProvider = ({ children }) => {
   const [expenses, setExpenses] = useState(null);
   const [cat, setCat] = useState('1');
   const [amount, setAmount] = useState('');
   const [title, setTitle] = useState('');
   const [date, setDate] = useState(new Date());
   const [id, setId] = useState('');
   const [toEdit, setToEdit] = useState(null);
   const [editing, setEditing] = useState(false);
   const [balance, setBalance] = useState(0);
   const [positives, setPositives] = useState(0);
   const [negatives, setNegatives] = useState(0);
   const [refreshing, setRefreshing] = useState(false);

   let todayDate;
   if (date.length === 10) {
      setDate(new Date());
   } else {
      todayDate = `${date.getFullYear()}-${
         date.getMonth() + 1
      }-${date.getDate()}`;
   }

   function fetchData() {
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
   }

   useEffect(() => {
      // fetch expenses from DB on page load
      fetchData();
   }, []);

   useEffect(() => {
      // calculates Balance
      if (expenses) {
         let totals = expenses.reduce(
            (acc, exp) => {
               acc.totalBalance += exp.amount;
               exp.cat_id !== '4'
                  ? (acc.totalNegatives += exp.amount)
                  : (acc.totalPositives += exp.amount);
               return acc;
            },
            { totalBalance: 0, totalNegatives: 0, totalPositives: 0 }
         );

         setBalance(totals.totalBalance);
         setNegatives(totals.totalNegatives);
         setPositives(totals.totalPositives);
      }
   }, [expenses, setBalance, setNegatives, setPositives]);

   // handles refresh screen
   const onRefresh = useCallback(() => {
      handleRefresh();
      setRefreshing(true);
      setTimeout(() => {
         setRefreshing(false);
      }, 1000);
   }, []);

   const handleRefresh = () => {
      // fetch expenses from DB on page load
      fetchData();
   };

   // handles new expense
   const submitHandler = (e) => {
      e.preventDefault();

      if (!title.trim()) {
         Alert.alert('Input warning', 'Please fill comment input', [
            { text: 'OK' },
         ]);
         return;
      }
      if (!amount.trim()) {
         Alert.alert('Input warning', 'Please enter transaction amount', [
            { text: 'OK' },
         ]);
         return;
      }

      // If cat is not "Salary", make amount negative
      let finalAmount = cat !== '4' ? -Math.abs(amount) : parseInt(amount);

      const newExp = {
         cat_id: cat,
         amount: finalAmount,
         comment: title,
         date: todayDate,
      };
      console.log(newExp);
      axios
         .post(`${BASE_URL}/exp`, newExp)
         .then((res) => {
            if (res.status === 200) {
               // Get the ID from the server response
               const idFromServer = res.data.id;
               // Add the ID to the new expense object
               newExp.id = idFromServer;
               // Add the new expense to the state
               setExpenses((prevExpenses) => [...prevExpenses, newExp]);
               setCat('');
               setAmount('');
               setTitle('');
               setDate(todayDate);
            }
         })
         .catch((err) => {
            console.warn('ERROR: ', err);
         });
   };

   const handleFormFill = (id) => {
      const found = expenses.find((exp) => exp.id === id); // if user exists fill input fields
      setCat(found.cat_id);
      setAmount(found.amount);
      setTitle(found.comment);
      setDate(found.date);
      setId(found.id);
   };

   const handleEdit = (id) => {
      setToEdit(id);
      handleFormFill(id);
      setEditing(true);
   };

   // handles Edit expense
   const handleSubmitEdit = (e) => {
      e.preventDefault();
      const editExp = {
         cat_id: cat,
         comment: title,
         date,
         amount: parseInt(amount),
      };
      axios
         .put(`${BASE_URL}/exp/${id}`, editExp)
         .then((res) => {
            if (res.status === 200) {
               // updates existing expense by ID with created editExp Object
               let updatedExpenses = expenses.map((exp) =>
                  exp.id === id ? { id, ...editExp } : exp
               );
               setExpenses(updatedExpenses);
               setCat('');
               setAmount('');
               setTitle('');
               setDate(todayDate);
            }
         })
         .catch((err) => {
            console.warn('ERROR: ', err);
         });
   };

   const handleDelete = (e) => {
      e.preventDefault();
      axios
         .delete(`${BASE_URL}/exp/${toEdit}`)
         .then((res) => {
            // Filter out the deleted expense from the state
            setExpenses((prevExpenses) =>
               prevExpenses.filter((expense) => expense.id !== toEdit)
            );
            setCat('');
            setAmount('');
            setTitle('');
            setDate(todayDate);
         })
         .catch((error) => {
            console.warn('ERROR:', error);
         });
   };

   const handleCancel = (e) => {
      e.preventDefault();
      setEditing(false);
      setCat('');
      setAmount('');
      setTitle('');
      setDate(todayDate);
   };

   return (
      <ExpContext.Provider
         value={{
            submitHandler,
            handleEdit,
            expenses,
            setExpenses,
            cat,
            setCat,
            amount,
            setAmount,
            title,
            setTitle,
            date,
            setDate,
            editing,
            toEdit,
            setToEdit,
            handleSubmitEdit,
            handleDelete,
            balance,
            positives,
            negatives,
            handleCancel,
            todayDate,
            onRefresh,
            refreshing,
         }}
      >
         {children}
      </ExpContext.Provider>
   );
};
