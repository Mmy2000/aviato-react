import toast from 'react-hot-toast';

export const showInfoToast = (message) => {
  toast(message, {
    icon: 'ℹ️',
    style: {
      color: "#3182CE",
    },
  });
};
