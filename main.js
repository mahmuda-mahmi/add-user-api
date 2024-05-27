let newArr = []; 
let showAll = false;

const getData = async () => {
       const res = await fetch(`https://randomuser.me/api/`);
       const data = await res.json();
       const results = data.results[0];
       newArr.push(results);
       addUserData();
}

const addUserData = () => {
       let tempArr;
       if(showAll){
              tempArr = newArr;
       }
       else{
              tempArr = newArr.slice(0,4);
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
                                   <h3 class="font-bold text-center text-white mt-2">${element.name.first} ${element.name.last}, ${element.dob.age}</h3>
                                   <span class="my-2">${element.location.state}, ${element.location.country}</span>
                                   <span class="mb-2">${element.location.timezone.description}</span>
                                   <button class="my-4 mx-auto">Resume</button>
       `;
              userCard.appendChild(div);
       });
};


const showMore = () => {
       showAll = true;
       addUserData();
}