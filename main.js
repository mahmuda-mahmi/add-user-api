let newArr = []; 

let showAll = false;

const getData = async () => {
       const res = await fetch(`https://randomuser.me/api/`);
       const data = await res.json();
       const results = data.results[0];
       newArr.push(results);
       addUserData();
}

const addUserData = (filterData = newArr) => {
       let tempArr;
       if(showAll){
              tempArr = filterData;
       }
       else{
              tempArr = filterData.slice(0,4);
       }

       const userCard = document.getElementById('user-card');
       userCard.textContent = ' ';
       // tempArr.slice(0,4);
       tempArr.forEach(element => {
              const div = document.createElement('div');
              div.classList = 'card p-5 bg-[#1a2634] grid';
              div.innerHTML = `
                                   <div>
                                          <img class="rounded-full mx-auto my-3" src="${element.picture.large}">
                                   </div>
                                   <h3 class="font-bold text-center text-white mt-2">${element.name.first} ${element.name.last}</h3>
                                   <span class="my-2">${element.dob.age}, ${element.gender.toUpperCase()}</span>
                                   <span class="my-2">${new Date(element.dob.date).toLocaleDateString()}</span>
                                   <span class="my-2">${element.location.state}, ${element.location.country}</span>
                                   <span class="mb-2">${element.location.timezone.description}</span>
                                   <button class="my-4 mx-auto">Resume</button>
       `;
              userCard.appendChild(div);
       });
       // making show more button hide
       const showMoreBtn = document.getElementById('show-more');
       if(newArr.length>4 && !showAll){
              showMoreBtn.removeAttribute('hidden');
       }
       else{
              showMoreBtn.setAttribute('hidden', true);
       }
};

const showMore = () => {
       showAll = true;
       addUserData();
}

const sortBtn = () => {
       newArr.sort((a,b) => new Date(b.dob.date) - new Date(a.dob.date));
       addUserData();
}

const searchInput = () => {
       const inputText = document.getElementById("get-input");
       const searchInputString = inputText.value.toLowerCase();
       const searchInputValue = inputText.value;
       inputText.value = ' ';
       const filterData = newArr.filter(user => 
              user.name.first.toLowerCase().includes(searchInputString) ||
              user.name.last.toLowerCase().includes(searchInputString) ||
              user.dob.age.toString().includes(searchInputValue) ||
              user.location.state.toLowerCase().includes(searchInputString) ||
              user.location.country.toLowerCase().includes(searchInputString) ||
              user.gender.toLowerCase().includes(searchInputString)
       );
       addUserData(filterData);
       if(filterData == []) {
              !showAll;
       }
       else{
              showAll = true;
       }
}
