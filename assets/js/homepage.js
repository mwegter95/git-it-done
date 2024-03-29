var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok){
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            } else {
                alert("Error: GitHub User Not Found");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to GitHub");
        });



};

var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

var displayRepos = function(repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    console.log(repos);
    console.log(searchTerm);
    // loop over repos
    for (let i = 0; i < repos.length; i++) {
        // format repo name
        const repoName = repos[i].owner.login + "/" + repos[i].name;
        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // create status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = `<i class=' fas fa-times status-icon icon-danger'></i> ${repos[i].open_issues_count} issue(s)`;
        } else {
            statusEl.innerHTML =`<i class='fas fa-times status-icon icon-success'></i>`;
        }
        // append to container
        repoEl.appendChild(statusEl);

        // append to container
        repoEl.appendChild(titleEl);
        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener ("submit", formSubmitHandler);



