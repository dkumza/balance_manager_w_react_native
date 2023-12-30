import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const ExpContext = createContext();

let BASE_URL;
// check if connecting from local pc or from physical device
if (__DEV__) {
   BASE_URL =
      Platform.OS === 'android'
         ? 'http://192.168.32.84:3000/api'
         : 'http://192.168.32.84:3000/api';
} else {
   BASE_URL = 'http://localhost:3000/api';
}

let today = new Date();
let todayDate =
   today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

export const ExpProvider = ({ children }) => {
   const [expenses, setExpenses] = useState(null);
   const [cat, setCat] = useState('1');
   const [amount, setAmount] = useState(0);
   const [title, setTitle] = useState('');
   const [date, setDate] = useState(todayDate);
   const [id, setId] = useState('');
   const [toEdit, setToEdit] = useState(null);
   const [editing, setEditing] = useState(false);
   const [balance, setBalance] = useState(0);
   const [positives, setPositives] = useState(0);
   const [negatives, setNegatives] = useState(0);

   useEffect(() => {
      // fetch expenses from DB on page load
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

   // handles new expense
   const submitHandler = (e) => {
      e.preventDefault();

      // If cat is not "Salary", make amount negative
      let finalAmount = cat !== '4' ? -Math.abs(amount) : parseInt(amount);

      const newExp = {
         cat_id: cat,
         amount: finalAmount,
         comment: title,
         date,
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
         }}
      >
         {children}
      </ExpContext.Provider>
   );
};
