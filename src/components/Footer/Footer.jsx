// Footer.jsx
import React from 'react';

export default function Footer(){
  return (
    <footer className="bg-slate-200 p-4 min-h-[15vh] flex justify-between items-center absolute bottom-0 left-0 right-0">
      <div className="text-[.8rem] mx-auto flex justify-between items-center flex-wrap gap-1 w-full">
        <p className="">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <div>
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white ml-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};


