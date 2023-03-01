function allUsers() {
    document.querySelector('.blur_container').style.display = 'none';

    const container = document.querySelector('.users_list');
    document.querySelector('.add').addEventListener('click', showForm);

    USERS = JSON.parse(localStorage.getItem('users')) || [];
    container.innerHTML = '';

    for (let i = 0; i < USERS.length; i++) {

        const oneUser = document.createElement('div');
        oneUser.setAttribute('class', 'oneUser')
        container.appendChild(oneUser);
        const person = document.createElement('div');
        person.textContent = USERS[i].name;
        person.setAttribute('user_number', i);
        person.setAttribute('userId', i)
        oneUser.appendChild(person);

        const btnBlock = document.createElement('div');
        btnBlock.setAttribute('class', 'btn_block');
        oneUser.appendChild(btnBlock);

        const edit = document.createElement('button');
        edit.textContent = 'Edit';
        edit.setAttribute('edit', i);
        edit.addEventListener("click", editSomeone);
        btnBlock.appendChild(edit);

        const view = document.createElement('button');
        view.textContent = 'VIEW';
        view.setAttribute('view', i);
        view.addEventListener('click', viewPerson);
        btnBlock.appendChild(view);

        const del = document.createElement('button');
        del.textContent = 'Remove';
        del.setAttribute('remove', i);
        del.addEventListener('click', removePerson);
        btnBlock.appendChild(del);
    }
    document.querySelector('.pop_up').style.display = 'none';
}

function showForm() {
    document.querySelector('.show_form').classList.toggle('hidden');
    let userName = document.querySelector('#f_name');
    let userPassword = document.querySelector('#pass');
    let userAge = document.querySelector('#age');
    let userEmail = document.querySelector('#e_mail');
    let userPhone = document.querySelector('#phone');
    let userCard = document.querySelector('#card');


    const saveForm = document.querySelector('.save_form_btn');
    saveForm.addEventListener('click', formInfo)

    function formInfo() {
        document.querySelector('.show_form').classList.add('hidden');

        USERS.push({
            name: userName.value,
            password: userPassword.value,
            age: userAge.value,
            Email: userEmail.value,
            phone: userPhone.value,
            card: userCard.value,
        });

        localStorage.setItem('users', JSON.stringify(USERS));
        allUsers();
        document.querySelector('form').reset();
    }


}

function editSomeone(event) {

}

function viewPerson(event) {
    document.querySelector('.pop_up').style.display = 'block';
    document.querySelector('.blur_container').style.display = 'block';

    const popUp = document.querySelector('.pop_up');
    popUp.classList.add('popActive');
    popUp.innerHTML = '';
    const categoryIndex = event.target.getAttribute('view');
    popUp.innerHTML = `Name : ${USERS[categoryIndex].name} </br>
    Age : ${USERS[categoryIndex].age} years</br>
    E-mail : ${USERS[categoryIndex].Email}</br>
    phone : ${USERS[categoryIndex].phone}</br>
    Bank card : ${USERS[categoryIndex].card} `;
    const closePop = document.createElement('button');
    closePop.classList.add('closePopUp');
    closePop.innerText = 'OK'
    popUp.appendChild(closePop);
    closePop.addEventListener('click', closeView);

    function closeView() {
        document.querySelector('.pop_up').style.display = 'none';
        document.querySelector('.blur_container').style.display = 'none';

    }
}

function removePerson(event) {

    document.querySelector('.blur_container').style.display = 'block';
    document.querySelector('.pop_up').style.display = 'block';

    const popUp = document.querySelector('.pop_up');
    popUp.innerHTML = ''
    popUp.classList.add('popActive');
    const confirmationPopUp = document.createElement('div');
    confirmationPopUp.classList.add('confirmationPopUp');
    const question = document.createElement('h2');
    question.textContent = 'Delete this user ?'
    popUp.appendChild(confirmationPopUp);
    popUp.appendChild(question);

    const confirmDel = document.createElement('button');
    confirmDel.textContent = 'YES';
    confirmationPopUp.appendChild(confirmDel);
    confirmDel.addEventListener('click', removeElement);

    const cancelDel = document.createElement('button');
    cancelDel.textContent = 'NO';
    confirmationPopUp.appendChild(cancelDel);
    cancelDel.addEventListener('click', closePopUp);
    const indexOfPerson = event.currentTarget.getAttribute('remove');

    function closePopUp() {
        document.querySelector('.pop_up').style.display = 'none';
        document.querySelector('.blur_container').style.display = 'none';

    }

    function removeElement(event) {
        USERS.splice(indexOfPerson, 1);
        localStorage.setItem('users', JSON.stringify(USERS));
        document.querySelector('.pop_up').style.display = 'none';
        document.querySelector('.blur_container').style.display = 'none';
        allUsers();
    }
}

allUsers()

