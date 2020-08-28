import faker from 'faker';

let communites = []
for (let i = 0; i < 10; i += 1) {
    communites.push({
        id: faker.random.uuid(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        type: 'Game',
        followersAmount: faker.random.number(),
        postsAmount: faker.random.number(),
        img: faker.image.avatar(),
        isFollow: false,
    })
}
console.log(communites)
let mycommunites = [];

const mainContainer = document.body.querySelector('.mainContainer');

const getUserAvatar = (imgSrc) => {
    const userAvatar = document.createElement('div');
    userAvatar.className = 'userAvatar';
    const img = document.createElement('img')
    img.src = imgSrc;
    userAvatar.append(img)
    return userAvatar
}

const getUserName = (name) => {
    const userName = document.createElement('div');
    userName.className = 'userName';
    userName.textContent = name;
    return userName
}

const getUserInfo = (type, followersAmount, postsAmount) => {
    const userInfo = document.createElement('div');
    userInfo.className = 'userInfo';
    userInfo.textContent = (type + '  ' + followersAmount + ' Followers   ' + postsAmount + ' Posts')
    return userInfo
}

const changeButton = (i) => {
    let button = document.createElement('div');
    button.className = 'button';
    button.type = communites[0].isFollow;
    button.innerHTML = 'Follow'
    console.log(i)
    button.addEventListener('click', function () {
        console.log(communites[i]);
        console.log(communites[i].isFollow == false)
        if (communites[i].isFollow == false) {

            button.classList.remove('button')
            button.classList.add('clickButton')
            button.innerHTML = 'Unfollow';
            mycommunites.push(communites[i])  }
        else {
             button.innerHTML = 'Follow';
            button.className = 'button'
            mycommunites = mycommunites.filter(value => value.id !== communites[i].id)

        

        }


        communites[i].isFollow = !communites[i].isFollow;
    })


    return button
}
const getButton = (I) => {
    let newButton = document.createElement('div');
    newButton.className = 'newButton';
    newButton.innerHTML = '. . .';
    newButton.addEventListener('click', function (e) {
    
      const ul = document.createElement('ul');
      const li = document.createElement('li');
      li.innerText='Unfollow';
      li.addEventListener('click', e => {
          e.stopPropagation();
      })
      ul.append(li);
        newButton.append(ul)
    })
    const close=document.createElement('div')
    return newButton;
}


const createUserInfo = (name, type, followersAmount, postsAmount) => {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'infoDiv';
    infoDiv.append(getUserName(name), getUserInfo(type, followersAmount, postsAmount));
    return infoDiv
}


const createUserContainer = (communite, I) => {
    const userContainer = document.createElement('div');
    userContainer.className = 'user_container';
    userContainer.append(
        getUserAvatar(communite.img), 
        createUserInfo(
            communite.name, 
            communite.type, 
            communite.followersAmount, 
            communite.postsAmount
        ), 
        changeButton(I)
    );

    return userContainer
}



const createMyUserContainer = (communite, I) => {
    const userContainer = document.createElement('div');
    userContainer.className = 'user_container';
    userContainer.append(
        getUserAvatar(communite.img), 
        createUserInfo(
            communite.name, 
            communite.type, 
            communite.followersAmount, 
            communite.postsAmount
        ), 
        getButton(I)
    );

    return userContainer
}

for (let i = 0; i < communites.length; i++) {
    mainContainer.append(createUserContainer(communites[i], i));
}


const myDiscover = document.body.querySelector('.myCommunites');
myDiscover.addEventListener("click", () => {
    mainContainer.innerHTML = '';
    for (let i = 0; i < mycommunites.length; i++) {
        mainContainer.append(createMyUserContainer(mycommunites[i], i))
    }
})

const discover = document.body.querySelector('.discover');
discover.addEventListener("click", () => {
    mainContainer.innerHTML = '';
    for (let i = 0; i < communites.length; i++) {
        mainContainer.append(createUserContainer(communites[i], i));
    }
})


console.log(mycommunites);