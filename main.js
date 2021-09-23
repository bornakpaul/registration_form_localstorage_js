function validation(){
    let user = document.getElementById("username").value;
    let pass = document.getElementById("pass").value;
    let nationality = document.getElementById("country").value;
    let terms = document.getElementById("terms");
    let Male = document.getElementById("Male");
    let Female = document.getElementById("Female");
    let Others = document.getElementById("Others");
    let gender = "";

    let user_error = document.getElementById('user_error');
    let pass_error = document.getElementById('pass_error');
    let country_error = document.getElementById('country_error');
    let terms_error = document.getElementById('terms_error');
    let gender_error = document.getElementById('gender_error');

    if(user.length === 0){
        user_error.style.display = "block";
    }

    if(pass.length === 0){
        pass_error.style.display = "block";
    }

    if(nationality.length === 0){
        country_error.style.display = "block";
    }

    if(Male.checked == true){
        gender = Male.value;
    }else if(Female.checked == true){
        gender = Female.value;
    }else if(Others.checked == true){
        gender = Others.value;
    }else {
        gender_error.style.display = "block";
    }

    if(terms.checked == false){
        terms_error.style.display = "block";
    }
    
    if(user.length >= 1){
        user_error.style.display = "none";
    }
    if(pass.length >= 1){
        pass_error.style.display = "none";
    }
    if(gender.length >= 1){
        gender_error.style.display = "none";
    }
    if(nationality.length >= 1){
        country_error.style.display = "none";
    }
    if(terms.checked == true){
        terms_error.style.display = "none";
    }

    if((user.length && pass.length && nationality.length && gender.length>= 1)&&terms.checked == true){
        dataStorage();
        postData();
    }
}


function dataStorage(){
    let user = document.getElementById("username").value;
    let pass = document.getElementById("pass").value;
    let nationality = document.getElementById("country").value;
    let Male = document.getElementById("Male").value;
    let Female = document.getElementById("Female").value;
    let Others = document.getElementById("Others").value;
    let gender = Male || Female || Others;

    let myObj = {
        user: user,
        pass: pass,
        country: nationality,
        gender: gender,
        terms_agreed: 'true'
    };


    if(localStorage.getItem('users') == null){
        localStorage.setItem('users','[]');
    }

    let old_data = JSON.parse(localStorage.getItem('users'));
    old_data.push(myObj);

    let myObj_serialized = JSON.stringify(old_data);

    localStorage.setItem('users', myObj_serialized);

    let myObj_deserialized = JSON.parse(localStorage.getItem('users'));
    console.log(myObj_deserialized);

    // let myObj_serialized = JSON.stringify(myObj);
    
    // localStorage.setItem("details", myObj_serialized);
    // //console.log(localStorage);

    // let myObj_deserialized = JSON.parse(localStorage.getItem("details"));
    // console.log(myObj_deserialized);
}

function postData(){
    let user = document.getElementById("username").value;
    let pass = document.getElementById("pass").value;

    fetch("https://reqres.in/api/register",{
       method : "Post",
       headers : {
          "Content-Type": "application/json"
       },
       body : JSON.stringify({
          "email": user,
          "password": pass
       })
    })
    .then(response => {
       if(!response.ok){
          throw Error("ERROR");
       }
       return response.json;
    })
    .then(data =>{
       console.log(data);
    })
    .catch(error => {
       console.log(error);
    })
  }

