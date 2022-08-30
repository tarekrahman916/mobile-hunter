const loadPhone = async(inputText,dataLimit) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${inputText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data,dataLimit);
}

const displayPhone = (phones,dataLimit) => {
    
    //Display 10 phone
  const showAll = document.getElementById('show-all');
     if (dataLimit &&phones.length > 10) {
       phones = phones.slice(0, 10)
       showAll.classList.remove('d-none');
     } else {
       showAll.classList.add('d-none');
  }
  

     //No found massage
    const noPhone=document.getElementById('no-found-massage')
     if (phones.length===0) {
       noPhone.classList.remove('d-none');
     } else {
        noPhone.classList.add('d-none');
     }
  


    //display all phone
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    phones.forEach(phone => {
        //console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
          <div class="card h-100">
            <img src="${phone.image}" class="card-img-top img-fluid " alt="..." >
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="loadPhoneDetails('${phone.slug}')">
                See Details
            </button>
            </div>
          </div>
        `
        
        phoneContainer.appendChild(phoneDiv);
    });
  toggleSpinner(false)
}

const processSearch = (dataLimit) => {
     toggleSpinner(true)
     const inputField = document.getElementById('search-field');
     const inputText = inputField.value;
     loadPhone(inputText,dataLimit);
}

//search button click handler
document.getElementById('btn-search').addEventListener('click', function () {
     processSearch(10)
})



//input keypress  handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
  if (e.key==='Enter') {
    processSearch(10)
  }   
  
})

const toggleSpinner = isLoading => {
  const loader=document.getElementById('loader')
      if (isLoading) {
        loader.classList.remove('d-none');
      } else {
        loader.classList.add('d-none');
      }
}

//show all btn handler
document.getElementById('btn-show-all').addEventListener('click', function () {
  processSearch()

})

const loadPhoneDetails = async(phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone => {
  console.log(phone);
  const modalTitle = document.getElementById('detailsModalLabel');
  modalTitle.innerText = phone.name;
   
  const phoneDetailsContainer = document.getElementById('details-container');
  phoneDetailsContainer.innerHTML = `
      <img src="${phone.image}" alt="" srcset="">
      <p>Brand: ${phone.brand ? phone.brand : 'No Brand Found'}</p>
      <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'Release Date Information Not Found'}</p>
      
      <p>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'Display Size Information Not Found'}</p>
      <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'Memory Information Not Found'}</p>
     
  `
}


loadPhone('apple')