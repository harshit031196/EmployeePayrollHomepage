let isUpdate = false;
let employeePayrollObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      textError.textContent = "";
      return;
    }
    try {
      (new EmployeePayroll()).name = name.value;
      textError.textContent = "";
    } catch (error) {
      textError.textContent = error;
    }
  });

  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input', function () { output.textContent = salary.value; });

  const day = document.querySelector('#day');
  const year = document.querySelector('#year');
  const month = document.querySelector('#month');
  const dateError = document.querySelector('.date-error');
  [day, month, year].forEach(item => item.addEventListener('input', function () {
    if (month.value == 2) {
      if (isLeapYear(year.value)) {
        if (day.value > 29) {
          dateError.textContent = "Invalid Date!";
        } else dateError.textContent = "";
      } else {
        if (day.value > 28) {
          dateError.textContent = "Invalid Date!";
        } else dateError.textContent = "";
      }
    }
    if (month.value == 4 || month.value == 6 || month.value == 9 || month.value == 11) {
      if (day.value > 30) {
        dateError.textContent = "Invalid Date!";
      } else dateError.textContent = "";
    }
  }));

  checkForUpdate();
});

const save = () => {
  checked = $("input[type=checkbox]:checked").length;
  if (!checked) {
    alert("You must select at least one department.");
    return;
  }

  try {
    let employeePayrollData = createEmployeePayroll();
    createAndupdateStorage(employeePayrollData);
    resetForm();
  } catch (error) {
    alert(error);
  }
}

const createEmployeePayroll = () => {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  let recentId = 0;
  if (employeePayrollList) {
    for (const empData of employeePayrollList) {
      if (recentId < empData._id)
      recentId = empData._id;
    }
  }

  let employeePayrollData = new EmployeePayroll();
  try {
    employeePayrollData.id = recentId + 1;
    employeePayrollData.name = getInputValueById('#name');
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    if (document.querySelector('.date-error').textContent == "") {
      employeePayrollData.startDate = new Date(getInputValueById('#year'),
        parseInt(getInputValueById('#month')) - 1,
        getInputValueById('#day'));
    } else throw "Cannot Enter Impossible Date!";
    alert(employeePayrollData);
    return employeePayrollData;
  } catch (error) {
    throw error;
  }
}

function createAndupdateStorage(employeePayrollData) {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (employeePayrollList == undefined) {
    employeePayrollList = [employeePayrollData];
  } else {
    employeePayrollList.push(employeePayrollData);
  }
  alert(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const setForm = () => {
  setValue('#name', employeePayrollObject._name);
  setSelectedValues('[name=profile]', employeePayrollObject._profilePic);
  setSelectedValues('[name=gender]', employeePayrollObject._gender);
  setSelectedValues('[name=department]', employeePayrollObject._department);
  setValue('#salary', employeePayrollObject._salary);
  setTextValue('.salary-output', employeePayrollObject._salary);
  setValue('#notes', employeePayrollObject._notes);
  let date = stringifyDate(employeePayrollObject._startDate).split(" ");
  let month = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(date[1]);
  setValue('#day', date[0]);
  setValue('#month', month);
  setValue('#year', date[2]);
}

const resetForm = () => {
  setValue('#name', '');
  setTextValue('#name-error', '');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary', '');
  setValue('#notes', '');
  setSelectedIndex('#day', 0);
  setSelectedIndex('#month', 0);
  setSelectedIndex('#year', 0);
  setTextValue('#date-error', '');
}

const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item => {
    if (item.checked) {
      selItems.push(item.value);
    }
  });
  return selItems;
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    item.checked = false;
  });
}

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) {
        item.checked = true;
      }
    }
    else if (item.value === value) {
      item.checked = true;
    }
  });
}

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

const setSelectedIndex = (id, index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
}

const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem('editEmp');
  isUpdate = employeePayrollJson ? true : false;
  if (!isUpdate) {
    return;
  }
  employeePayrollObject = JSON.parse(employeePayrollJson);
  setForm();
}

const isLeapYear = (year) => {
  let result = false;
  if (year % 4 == 0) {
    if (year % 100 == 0) {
      if (year % 400 == 0) {
        result = true;
      }
    } else {
      result = true;
    }
  }
  return result;
}