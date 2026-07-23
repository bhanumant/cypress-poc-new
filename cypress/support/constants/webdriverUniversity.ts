export const WEBDRIVER_UNI_URLS = {
  checkboxPage: 'https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html',
  alertPage: 'https://webdriveruniversity.com/Popup-Alerts/index.html',
  iframePage: 'https://webdriveruniversity.com/IFrame/index.html',
  actionsPage: 'https://webdriveruniversity.com/Actions/index.html',
  dataTablePage: 'https://webdriveruniversity.com/Data-Table/index.html',
  fileUploadPage: 'https://webdriveruniversity.com/File-Upload/index.html',
  datePickerPage: 'https://webdriveruniversity.com/Datepicker/index.html',
  autocompletePage: 'https://webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html',
  contactUs: 'https://webdriveruniversity.com/Contact-Us/contactus.html',
} as const;

export const WEBDRIVER_UNI_ASSERTIONS = {
  options: {
    option1: 'option-1',
    option2: 'option-2',
    option3: 'option-3',
    option4: 'option-4',
  },
  expectedCheckboxCount: 4,
  radioButtons: {
    colors: {
      blue: 'blue',
      orange: 'orange',
    },
    vegetables: {
      pumpkin: 'pumpkin',
      lettuce: 'lettuce',
      cabbage: 'cabbage',
    },
  },
  dropdowns: {
    menu1: {
      java: 'java',
      csharp: 'c#',
      python: 'python',
      sql: 'sql',
    },
    menu2: {
      eclipse: 'eclipse',
      maven: 'maven',
      testng: 'testng',
      junit: 'junit',
    },
    menu3: {
      html: 'html',
      css: 'css',
      javascript: 'javascript',
      jquery: 'jquery',
    },
    fruits: {
      apple: 'apple',
      orange: 'orange',
      pear: 'pear',
      grape: 'grape',
    },
  },
  autocomplete: {
    searchTerms: {
      chi: 'Chi',
      asp: 'Asp',
      g: 'G',
      app: 'App',
    },
    foodItems: {
      chicken: 'Chicken',
      asparagus: 'Asparagus',
      garlic: 'Garlic',
      grapes: 'Grapes',
      apple: 'Apple',
    },
  },
  alertPage: {
    alertMessage: 'I am an alert box!',
    confirmMessage: 'Press a button!',
    confirmOkText: 'You pressed OK!',
    confirmCancelText: 'You pressed Cancel!',
    modalTitle: 'It’s that Easy!! Well I think it is.....',
  },
  iframePage: {
    modalTitle: 'Welcome to webdriveruniversity.com',
  },
  actionsPage: {
    droppedText: 'Dropped!',
    clickHoldActiveText: 'Well done! keep holding that click now.....',
    clickHoldReleasedText: 'Dont release me!!!',
  },
  dataTablePage: {
    table1Headers: ['Firstname', 'Lastname', 'Age'],
    table1TotalAge: 159,
    jemmaAge: '94',
    sarahAge: '56',
  },
  fileUploadPage: {
    noFileAlert: 'You need to select a file to upload!',
    successAlert: 'Your file has now been uploaded!',
    dummyFileName: 'dummy.txt',
    dummyContent: 'This is dummy content for testing upload.',
  },
  keyboardEvents: {
    sampleInputText: 'Cypress E2E Testing Framework',
    overwriteText: 'Keyboard Automation',
    partialText: 'Cypress E2E',
    enterSubmittedQuery: 'food-item=Chicken',
  },
} as const;







