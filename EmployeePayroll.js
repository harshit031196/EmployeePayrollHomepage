class EmployeePayroll {

    get name() {
      return this._name;
    }
    set name(name) {
      let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}([\\s][A-Z]{1}[a-z]{2,})?$');
      if (nameRegex.test(name)) {
        this._name = name;
      }
      else throw "Incorrect Name! Must Start With A Capital Letter!";
    }
  
    get id() {
      return this._id;
    }
    set id(id) {
      let idRegex = RegExp('^[1-9]{1}[0,9]{0,}$');
      if (idRegex.test(id)) {
        this._id = id;
      }
      else throw "Incorrect Id!";
    }
  
    get profilePic() {
      return this._profilePic;
    }
    set profilePic(profilePic) {
      this._profilePic = profilePic;
    }
  
    get gender() {
      return this._gender;
    }
    set gender(gender) {
      this._gender = gender;
    }
  
    get department() {
      return this._department;
    }
    set department(department) {
      this._department = department;
    }
  
    get salary() {
      return this._salary;
    }
    set salary(salary) {
      this._salary = salary;
    }
  
    get note() {
      return this._note;
    }
    set note(note) {
      if (note == "") {
        this._note = undefined;
      } else {
        this._note = note;
      }
    }
  
    get startDate() {
      return this._startDate;
    }
    set startDate(date) {
      if (date != undefined) {
        if (date <= new Date()) {
          const options = { year: "numeric", month: "long", day: "numeric" };
          const employeeDate = date === undefined ? "undefined" :
            date.toLocaleDateString("en-US", options);
          this._startDate = employeeDate;
        }
        else throw "Start Date Cannot Be Of The Future!";
      }
    }
  
    toString() {
      return "Id=" + this.id + ", Name=" + this.name + ", Gender=" + this.gender +
        ", ProfilePic=" + this.profilePic + ", department=" + this.department +
        ", Salary=" + this.salary + ", startDate=" + this.startDate + ", note=" + this.note;
    }
  }