const githubForm = document.querySelector('#github-form')
githubForm.addEventListener("submit", e => {
    e.preventDefault()
    let userName = githubForm.querySelector('#search').value
    fetch(`https://api.github.com/search/users?q=${userName}`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(resp => resp.json())
    .then(data => findTheCorrectUserName(data))
    function findTheCorrectUserName(data) {
        let possibleLogins = data.items
        possibleLogins.forEach(login => checkLogin(login))
    }
    function checkLogin(login) {
        if (login['login'] === userName) {
            let repoList = document.querySelector('#repos-list')
            let repo = document.createElement('ul')
            repo.innerHTML = `<a href=${login['repos_url']}>Repo List</a>`
            repoList.appendChild(repo)
            console.log(login)

            let userList = document.querySelector('#user-list')
            let userInfo = document.createElement('ul')
            userInfo.innerHTML = `<a href=${login['url']}>${login['login']}</a>`
            userList.appendChild(userInfo)
        }
    }
})

