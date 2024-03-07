// Validate form input before submitting data
function validateForm() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("Address").value;
    var email = document.getElementById("email").value;

    if (name == "") {
        alert("Name is required");
        return false;
    }

    if (age == "") {
        alert("Age is required");
        return false;
    } else if (age < 1) {
        alert("Age must be a positive number");
        return false;
    }

    if (address == "") {
        alert("Address is required");
        return false;
    }

    if (email == "") {
        alert("Email is required");
        return false;
    } else if (!email.includes("@")) {
        alert("Invalid Email Address");
        return false;
    }

    return true;
}

// Function to show data from local storage
function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html +=
            '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Load All data from local storage when document or page loaded
window.onload = showData;

// Function to add data to local storage
function addData() {
    // If form is validated
    if (validateForm()) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("Address").value;
        var email = document.getElementById("email").value;

        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name: name,
            age: age,
            address: address,
            email: email,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("Address").value = "";
        document.getElementById("email").value = "";
    }
}

// Function to delete data from local storage
function deleteData(index) {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

// Function to update/edit data from local storage
function updateData(index) {
    // Submit button will hide and update button will show for updating data in local storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("Address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function () {
        if (validateForm()) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("Address").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("Address").value = "";
            document.getElementById("email").value = "";

            // Update button will hide, and Submit button will show
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";

            showData(); // Call showData to refresh the displayed data
        }
    };
}