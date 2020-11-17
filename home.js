window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHTML();
  });
  
  const createInnerHTML = () => {
    const headerHtml = `
      <th></th>
      <th>Name</th>
      <th>Gender</th>
      <th>Department</th>
      <th>Salary</th>
      <th>Start Date</th>
      <th>Actions</th>`;
    let innerHtml = `${headerHtml}`;
    let employeePayrollList = createEmployeePayrollJSON();
    for (const employeePayrollData of employeePayrollList) {
      innerHtml = `${innerHtml}
      <tr>
        <td><img class="profile" alt="" src="${employeePayrollData._profilePic}"></td>
        <td>${employeePayrollData._name}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${getDeptHtml(employeePayrollData._department)}</td>
        <td>${employeePayrollData._salary}</td>
        <td>${employeePayrollData._startDate}</td>
        <td>
          <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete" 
                    src="../assets/icons/delete-black-18dp.svg">
          <img name="${employeePayrollData._id}" onclick="update(this)" alt="edit" 
                    src="../assets/icons/create-black-18dp.svg">
        </td>
      </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
  };
  
  const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
      {
        "_name": "Vaibhavi Sharma",
        "_gender": "Female",
        "_department": [
          "Finance"
        ],
        "_salary": "400000",
        "_startDate": "1 Jan 2020",
        "_notes": "",
        "_id": 1604589551457,
        "_profilePic": "../assets/profile-images/Ellipse 1.png"
      },
      {
        "_name": "Mohit Kumar",
        "_gender": "Male",
        "_department": [
          "Sales", "Marketing"
        ],
        "_salary": "400000",
        "_startDate": "1 Feb 2020",
        "_notes": "",
        "_id": 1604589699566,
        "_profilePic": "../assets/profile-images/Ellipse -3.png"
      }
    ]
    return empPayrollListLocal;
  }
  
  const getDeptHtml = (departmentList) => {
    let departmentHtml = '';
    for (const department of departmentList) {
      departmentHtml = `${departmentHtml} <div class="dept-label">${department}</div>` 
    }
    return departmentHtml;
  }