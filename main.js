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
       //show only 4 at first
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
              div.classList = 'card p-5 bg-[#1a2634] grid mx-4 sm:mx-6 md:mx-6 lg:mx-4';
              div.innerHTML = `
                                   <div>
                                          <img class="rounded-full mx-auto my-3" src="${element.picture.large}">
                                   </div>
                                   <h3 class="font-bold text-center text-white mt-2">${element.name.first} ${element.name.last}</h3>
                                   <span class="my-2">${element.dob.age}, ${element.gender.toUpperCase()}</span>
                                   <span class="my-2">${new Date(element.dob.date).toLocaleDateString()}</span>
                                   <span class="my-2">${element.location.state}, ${element.location.country}</span>
                                   <span class="mb-2">${element.location.timezone.description}</span>
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
//making show button work
const showMore = () => {
       showAll = true;
       addUserData();
}
//making sort button work
const sortBtn = () => {
       newArr.sort((a,b) => new Date(b.dob.date) - new Date(a.dob.date));
       addUserData();
}
//making search option work
const searchInput = () => {
       const inputText = document.getElementById("get-input");
       const searchInputString = inputText.value.toLowerCase();
       const searchInputValue = inputText.value;
       const searchInputGender = searchInputString.slice(0, 4); 
       inputText.value = '';
       const filterData = newArr.filter(user => 
              user.name.first.toLowerCase().includes(searchInputString) ||
              user.name.last.toLowerCase().includes(searchInputString) ||
              user.dob.age.toString().includes(searchInputValue) ||
              user.location.state.toLowerCase().includes(searchInputString) ||
              user.location.country.toLowerCase().includes(searchInputString) ||
              user.gender.slice(0,2).includes(searchInputGender) 
       );
       addUserData(filterData);
       //error handling show more button
       if(filterData == []) {
              !showAll;
       }
       else{
              showAll = true;
       }
}
