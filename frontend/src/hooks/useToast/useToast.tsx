import { createContext, ReactNode, useState, useContext } from 'react';
import Toast from '../../components/ui/toast/Toast';

interface ToastProps {
  message: string;
  status?: '' | 'success' | 'error' | 'warning' | 'info';
}

interface ToastContextType {
  openToast: (message: string, status: ToastProps['status']) => void;
}

export const ToastContext = createContext<ToastContextType>({
  openToast: (message, status) => {
    console.log(message, status);
  },
});

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastProps>({
    message: '',
    status: 'info',
  });

  const handleSnackClose = () => {
    setToast({
      ...toast,
      message: '',
    });
  };

  const openToast = (message: string, status: ToastProps['status']) => {
    setToast({
      ...toast,
      message,
      status,
    });
  };

  return (
    <ToastContext.Provider value={{ openToast }}>
      {children}
      <Toast
        isOpen={!!toast?.message}
        autoCloseMilli={3000}
        onClose={handleSnackClose}
        message={toast?.message}
        status={toast?.status}
        mode="filled"
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
