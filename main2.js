let string = ['rahim', 'karim', 'lamia', 'samia'];
document.getElementById('search-btn').addEventListener('click', function(){
    const inputField = document.getElementById('get-input');
    const input = inputField.value;
    string.forEach(element => {
        if(input === element){
            console.log(element);
        }
    });
})