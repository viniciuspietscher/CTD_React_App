import { createContext, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuid } from 'uuid';

const ToastContext = createContext();

const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const createToast = (text, persisted = false) => {
    const newToast = {
      id: uuid(),
      text: text,
      persisted: persisted
    };
    setToasts((prev) => [...prev, newToast]);
    return newToast;
  };

  const removeToast = (id) => {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(newToasts);
  };

  const contextValue = { createToast, removeToast, toasts };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

ToastContextProvider.propTypes = {
  children: PropTypes.any,
};

export { ToastContextProvider };

export const useToast = () => {
  return useContext(ToastContext);
};
