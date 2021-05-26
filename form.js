
const form = document.querySelector('form');
const input = document.querySelector('.text');
const btn = document.querySelector('.btn');
let token;

form.addEventListener('submit', handleSubmit)

 function handleSubmit(e) {
    e.preventDefault();
    btn.setAttribute("disabled", true)
    btn.classList.add('active');
    
    //You can use your token here or input it through the form
    token = input.value || 'Your Token'
    console.log(token)

  fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
          'Authorization': `bearer ${token}`
        },
        body: JSON.stringify({
          query: `
              query getUserDetails {
                  viewer {
                      repositories(first: 20) {
                        totalCount
                        nodes {
                          createdAt
                          description
                          name
                          url
                          isPrivate
                          languages(last: 20) {
                            nodes {
                              name
                              color
                            }
                          }
                          stargazerCount
                          pullRequests {
                            totalCount
                          }
                          updatedAt
                        }
                      }
                      avatarUrl
                      bio
                      login
                    }
              }
            `,
          variables: {
            
          },
        }),
      })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        if (result && result.message === 'Bad credentials') {
          alert(result.message);
          btn.setAttribute("disabled", false)
          btn.classList.remove('active');
        } else {
          window.localStorage.setItem('user', JSON.stringify(result.data))
         window.location.href = 'repo.html'
        }

       
     
      })
      .catch(error => {
        alert(error)
        console.log(error)
        btn.setAttribute("disabled", false)
        btn.classList.remove('active');
        
      }
        )


}
