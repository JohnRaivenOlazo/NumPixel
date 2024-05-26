import { useEffect } from 'react';

const openWindow = (setCalculatorActive) => {
  useEffect(() => {
    const openModals = document.querySelectorAll('.openWindow');
    const closeButton = document.querySelector('.close');
    const minimizeButton = document.querySelector('.minimize');
    const maximizeButton = document.querySelector('.maximize');
    const macWindow = document.querySelector('.mac-window');

    const handleOpenModalClick = () => {
      macWindow.classList.remove('hidden');
      macWindow.classList.remove('minimize');
      macWindow.classList.add('active');
      setCalculatorActive(true);
    };

    const handleCloseButtonClick = () => {
      macWindow.classList.remove('active');
      macWindow.classList.remove('maximize');
      macWindow.classList.remove('minimize');
      setCalculatorActive(false);
    };

    const handleMinimizeButtonClick = () => {
      macWindow.classList.toggle('minimize');
      macWindow.classList.remove('maximize');
    };

    const handleMaximizeButtonClick = () => {
      macWindow.classList.toggle('maximize');
      macWindow.classList.remove('minimize');
    };

    openModals.forEach((modal) => {
      modal.addEventListener('click', handleOpenModalClick);
    });
    closeButton.addEventListener('click', handleCloseButtonClick);
    minimizeButton.addEventListener('click', handleMinimizeButtonClick);
    maximizeButton.addEventListener('click', handleMaximizeButtonClick);

    return () => {
      openModals.forEach((modal) => {
        modal.removeEventListener('click', handleOpenModalClick);
      });
      closeButton.removeEventListener('click', handleCloseButtonClick);
      minimizeButton.removeEventListener('click', handleMinimizeButtonClick);
      maximizeButton.removeEventListener('click', handleMaximizeButtonClick);
    };
  }, [setCalculatorActive]);
};

export default openWindow;
