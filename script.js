document.addEventListener('DOMContentLoaded', () => {
  // Set the default font size for the root HTML element
  const root = document.querySelector(':root');
  const defaultFontSize = '13px';
  document.querySelector('html').style.fontSize = defaultFontSize;

  // Apply additional default CSS custom properties
  root.style.setProperty('--sticky-top-left', '5.4rem');
  root.style.setProperty('--sticky-top-right', '-7rem');

  /* =============================== SIDEBAR ============================== */
  const menuItems = document.querySelectorAll('.menu-item');

  const changeActiveItem = () => {
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
  };

  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      changeActiveItem();
      item.classList.add('active');

      // Hide all other popups
      document.querySelectorAll('.notifications-popup').forEach((popup) => {
        popup.style.display = 'none';
      });

      const notificationsPopup = item.querySelector('.notifications-popup');
      if (notificationsPopup) {
        if (notificationsPopup.style.display === 'block') {
          notificationsPopup.style.display = 'none';
        } else {
          notificationsPopup.style.display = 'block';
          const notificationCount = item.querySelector('.notification-count');
          if (notificationCount) {
            notificationCount.textContent = ''; // Clear content
            notificationCount.style.backgroundColor = 'transparent'; // Remove background color
          }
        }
      }
    });
  });

  /* =============================== MESSAGES ============================== */
  const messagesNotification = document.querySelector('#messages-notification');
  const messages = document.querySelectorAll('.messages');

  messagesNotification.addEventListener('click', () => {
    messages.forEach((message) => {
      message.style.boxShadow = '0 0 1rem var(--color-primary)';
      messagesNotification.querySelector('.notification-count').style.display =
        'none';
      setTimeout(() => {
        message.style.boxShadow = 'none'; // Remove box shadow after 2 seconds
      }, 2000);
    });
  });

  const messageSearch = document.querySelector('#message-search');
  const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    messages.forEach((message) => {
      const messageItems = message.querySelectorAll('.message');
      messageItems.forEach((chat) => {
        const name = chat.querySelector('h5').textContent.toLowerCase();
        chat.style.display = name.includes(val) ? 'flex' : 'none';
      });
    });
  };

  messageSearch.addEventListener('keyup', searchMessage);

  /* =============================== THEME & FONT SIZE ============================= */
  const theme = document.querySelector('#theme');
  const themeModal = document.querySelector('.customize-theme');
  const fontSizes = document.querySelectorAll('.choose-size span');

  // Set default font size
  const setDefaultFontSize = () => {
    const secondFontSize = fontSizes[1]; // Second item is the default active
    secondFontSize.classList.add('active');
    document.querySelector('html').style.fontSize = defaultFontSize; // 13px
  };

  setDefaultFontSize(); // Set default font size on DOM load

  // Open theme modal
  theme.addEventListener('click', () => {
    themeModal.style.display = 'grid';
  });

  // Close theme modal if clicked outside
  themeModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('customize-theme')) {
      themeModal.style.display = 'none';
    }
  });

  // Function to remove active class from all font size options
  const removeSizeSelector = () => {
    fontSizes.forEach((size) => {
      size.classList.remove('active');
    });
  };

  // Event listener for font size selection
  fontSizes.forEach((size) => {
    size.addEventListener('click', () => {
      removeSizeSelector(); // Clear previous active selection
      size.classList.add('active'); // Mark the selected option as active

      let fontSize;

      if (size.classList.contains('font-size-1')) {
        fontSize = '10px';
        root.style.setProperty('--sticky-top-left', '5.4rem');
        root.style.setProperty('--sticky-top-right', '5.4rem');
      } else if (size.classList.contains('font-size-2')) {
        fontSize = '13px';
        root.style.setProperty('--sticky-top-left', '5.4rem');
        root.style.setProperty('--sticky-top-right', '-7rem');
      } else if (size.classList.contains('font-size-3')) {
        fontSize = '16px';
        root.style.setProperty('--sticky-top-left', '-2rem');
        root.style.setProperty('--sticky-top-right', '-17rem');
      } else if (size.classList.contains('font-size-4')) {
        fontSize = '19px';
        root.style.setProperty('--sticky-top-left', '-5rem');
        root.style.setProperty('--sticky-top-right', '-25rem');
      } else if (size.classList.contains('font-size-5')) {
        fontSize = '22px';
        root.style.setProperty('--sticky-top-left', '-12rem');
        root.style.setProperty('--sticky-top-right', '-35rem');
      }

      // Apply the font size to the HTML element
      document.querySelector('html').style.fontSize = fontSize;
    });
  });
});
