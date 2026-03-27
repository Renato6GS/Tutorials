// Ejemplos más avanzado de un editor hook:

(function (channel, author) {
  'use strict';

  const CONFIG = {
    TABS: 'button.tabs-bar__tab',
    EDITABLE_TYPE: 'wknd/components/flipcard',
    ACTION_NAME: 'MY_DROPDOWN_ACTION_ACCORDION' // Nombre único
  }

  // Custom handle change tab
  const handleChangeTab = ({ tab }) => {
    const switchTab = () => {
      const clickEvent = new Event('click');
      tab.dispatchEvent(clickEvent);
    };

    switchTab();
  };

  const initDropdownItems = (editable) => {
    const element = editable.dom[0];
    const tabs = element.querySelectorAll(CONFIG.TABS);

    return Array.from(tabs).map((tab, index) => ({
      text: Granite.I18n.get(`Tab ${tab.textContent ? tab.textContent.trim() : index + 1}`),
      icon: 'DocumentFragment',
      execute: () => handleChangeTab({ tab })
    }));
  };

  const dropdownAction = new author.ui.ToolbarAction({
    name: 'DROPDOWN_ACTION',
    text: Granite.I18n.get('Dropdown Action'),
    icon: 'Dropdown',
    order: 'before COPY',
    execute: (editable, param, target) => {
      // Create container dropdown
      const dropdownContainer = new Coral.Popover().set({
        placement: 'bottom',
        open: true,
      });

      dropdownContainer.classList.add('coral-Overlay--context');
      dropdownContainer.style.zIndex = 1000;

      const dropdownItems = initDropdownItems(editable);

      // Add elements to dropdown
      dropdownItems.forEach(item => {
        const action = new Coral.Button().set({
          icon: item.icon,
          label: { innerHTML: item.text },
          variant: 'quiet',
        });

        action.on('click', () => {
          item.execute(editable);
          dropdownContainer.hide();
        });

        dropdownContainer.appendChild(action);
      });

      document.body.appendChild(dropdownContainer);

      // Search for the toolbar button to position the dropdown
      const toolbarButton = document.querySelector('.cq-editable-action[title="Dropdown Action"]');
      if (toolbarButton && typeof toolbarButton.getBoundingClientRect === 'function') {
        const targetRect = toolbarButton.getBoundingClientRect();
        dropdownContainer.style.position = 'absolute';
        dropdownContainer.style.top = `${targetRect.bottom + window.scrollY}px`;
        dropdownContainer.style.left = `${targetRect.left + window.scrollX}px`;
      } else {
        console.error('The toolbarButton does not have the getBoundingClientRect function.');
      }

      dropdownContainer.show();
    },
    condition: (editable) => {
      return editable.type === CONFIG.EDITABLE_TYPE;
    },
    isNonMulti: true,
  });

  channel.on('cq-layer-activated', (event) => {
    if (event.layer === 'Edit') {
      author.EditorFrame.editableToolbar.registerAction(CONFIG.ACTION_NAME, dropdownAction);
    }
  });
})(jQuery(document), Granite.author);
