// src/components/Dialog.jsx
import React, { ReactNode } from "react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (inputValue: string) => void;
  children: ReactNode;
};
const Dialog = ({ isOpen, onClose, onConfirm, children }: DialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Add Friend Email</h2>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
