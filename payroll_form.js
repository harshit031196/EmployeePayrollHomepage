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
      if (month.value == 1) {
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
      if (month.value == 3 || month.value == 5 || month.value == 8 || month.value == 10) {
        if (day.value > 30) {
          dateError.textContent = "Invalid Date!";
        } else dateError.textContent = "";
      }
    }));
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
    let employeePayrollData = new EmployeePayroll();
    try {
      employeePayrollData.name = getInputValueById('#name');
      employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
      employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
      employeePayrollData.department = getSelectedValues('[name=department]');
      employeePayrollData.salary = getInputValueById('#salary');
      employeePayrollData.note = getInputValueById('#notes');
      if (document.querySelector('.date-error').textContent == "") {
        employeePayrollData.startDate = new Date(getInputValueById('#year'), getInputValueById('#month'),
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
  
  const resetForm = () => {
    setValue('#name','');
    setTextValue('#name-error','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','01');
    setValue('#month','0');
    setValue('#year','2020');
    setTextValue('#date-error','');
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
  
  const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
  }
  
  const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
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