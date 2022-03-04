document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", function(e){
      e.preventDefault()
    });});

const form = document.querySelector("form")
form.addEventListener("submit", searchUsers) 

const userList = document.querySelector("#user-list")
const repoList = document.querySelector("#repos-list")

function searchUsers (e) {
    let searchTerm = e.target[0].value
    fetch(`https://api.github.com/search/users?q=${searchTerm}`)
    .then((resp) => resp.json())
    .then((data) => {
        for (user in data.items) {
            let username = data.items[user].login
            let profileImg = data.items[user].avatar_url
            let profileLink = data.items[user].url
            let li = document.createElement("li")
            li.innerHTML = `<h1 class="username">${username}</h1>
            <img src="${profileImg}"/>
            <p>Link to profile: ${profileLink}</p>`
            userList.appendChild(li)
        }
        let userNames = document.querySelectorAll(".username")
        for (user in userNames) {
            userNames[user].addEventListener("click",searchRepo)
        }
    })
}

function searchRepo(e) {
    let repoPerson = e.target.innerText
    fetch(`https://api.github.com/users/${repoPerson}/repos`)
    .then((resp) => resp.json())
    .then((data) => {
        for (repo in data) {
            let repoName = data[repo].name
            let li = document.createElement("li")
            li.innerText = repoName
            repoList.appendChild(li)
        }
})}