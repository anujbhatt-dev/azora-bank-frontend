import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const Dashboard = () => {
  // Access user data from context
  const navigate = useNavigate();
  const userData = useContext(UserContext);
  console.log(userData);
  

  // State to track whether the operation is a deposit (1) or withdrawal (0)
  const [operation, setOperation] = useState(1);

  // State to track the input amount for the transaction
  const [amount, setAmount] = useState(0);

  // Parse the amount as a number, defaulting to 0 if invalid or empty
  const parsedAmount = parseFloat(amount) || 0;

  // Get the current balance from user data and ensure it's a float with two decimal places
  const balance = parseFloat(userData.data.account.balance.toFixed(2));

  // Calculate the total balance after the transaction
  const total = operation ? balance + parsedAmount : balance - parsedAmount;

  // Function to handle the transaction when the user submits the form
  const handleTransaction = async (total) => {
    try {
      // Send the total balance to the server via a PATCH request
      if(isNaN(amount) || amount==0){
        throw new Error("please enter valid amount");
      }
      if(total<0){
        throw new Error("Total cannot be negative");
      }
      const response = await axios.patch("/account/banking", { amount:total });
      
      // Check if the transaction was successful
      if (response.data.success) {
        setAmount(0)
        userData.handleData(total);
        toast.success("Transaction successful!");
        // Optionally, update the balance in the user data here
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      // Log any errors that occur during the request
      console.log(error);
      toast.error(error.message || "An unexpected error occurred.")
    }
  };


  if(!userData){
    navigate('/login');
  }



  

  return (
    <div className='flex justify-center items-center flex-col'>
      {/* Dashboard Header */}
      <h2 className='text-[1.5rem] font-bold text-orange-500 uppercase text-center mt-[1rem]'>Dashboard</h2>
      
      {/* User Information */}
      <div className='w-full'>
        <div className='flex justify-center md:justify-between items-center mt-[1.5rem] md:flex-row flex-col'>
          <h2 className='text-[1.2rem] font-bold text-slate-500'>Welcome, {userData.data.user.name}</h2>
          <p className='text-[1rem] font-bold text-zinc-900'><span className='opacity-80'>Account Number </span>{userData.data.account.accountNumber}</p>
        </div>
      </div>
      
      {/* Balance Section */}
      <div className='mt-[3.5rem] md:text-[1.5rem] font-semibold md:w-full'>Balance</div><br />
      <div className='flex justify-between items-center flex-col md:flex-row gap-[1rem]'>
        
        {/* Display Current Balance */}
        <input
          className='bg-transparent bottom-0 border-b h-[3rem] pl-[.5rem] bg-slate-300 rounded outline cursor-not-allowed'
          value={balance.toFixed(2)}
          disabled
        />
        
        {/* Operation Symbol (+ or -) */}
        <span className='text-[1.5rem] w-[2rem] h-[2rem] flex justify-center items-center'>
          {operation ? "+" : "-"}
        </span>
        
        {/* Input Field for Transaction Amount */}
        <input
          className='bg-transparent bottom-0 border-b h-[3rem] pl-[.5rem] bg-slate-300 rounded outline'
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        
        {/* Equals Sign */}
        <span className='text-[1.5rem] w-[2rem] h-[2rem] flex justify-center items-center'>=</span>
        
        {/* Display Total After Transaction */}
        <input
          className='bg-transparent bottom-0 border-b h-[3rem] pl-[.5rem] bg-slate-300 rounded outline cursor-not-allowed'
          value={total.toFixed(2)}
          disabled
        />
        
        {/* Buttons to Switch Between Deposit and Withdrawal */}
        <div className='mt-[2rem] md:mt-[0rem] flex gap-[2rem]'>
          <button
            title='withdraw'
            onClick={() => setOperation(0)}
            className='self-start h-[3rem] w-[3rem] text-center bg-fuchsia-700 text-slate-50 rounded transition-all hover:-translate-y-[3px] active:-translate-y-[1px] shadow-sm shadow-gray-600'
            type="button"
          >
            -
          </button>
          <button
            title='deposit'
            onClick={() => setOperation(1)}
            className='self-start h-[3rem] w-[3rem] text-center bg-fuchsia-900 text-slate-50 rounded transition-all hover:-translate-y-[3px] active:-translate-y-[1px] shadow-sm shadow-gray-600'
            type="button"
          >
            +
          </button>
        </div>
      </div>
      
      {/* Submit Button to Perform Transaction */}
      <button
        onClick={() => handleTransaction(total)}
        className='mt-[2rem] h-[3rem] w-[10rem] text-center bg-fuchsia-950 text-slate-50 rounded transition-all hover:-translate-y-[3px] active:-translate-y-[1px] shadow-sm shadow-gray-600'
        type="button"
      >
        Submit
      </button>
    </div>
  );
};

export default Dashboard;
