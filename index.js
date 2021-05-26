const repoContents = document.querySelector('.repo-contents');
const img = document.querySelectorAll('.profileImg');
const repoCount = document.querySelector('.repo-count');
const names = document.querySelector('#name');
const about = document.querySelector('#about');
const pRCount = document.querySelector('#public-repo-count');


const {viewer} = JSON.parse(window.localStorage.getItem('user'));

//set all the background images
img.forEach(image => image.src = viewer.avatarUrl);

repoCount.innerHTML = viewer.repositories.totalCount
names.innerHTML = viewer.login
about.innerHTML = viewer.bio

//get the total number of public repos from all the first 20 repos
const count = viewer.repositories.nodes.filter(view => !view.isPrivate );
pRCount.innerHTML = count.length

const data = viewer.repositories.nodes.forEach(view => {
    //create all the required elements
    const repo = document.createElement('div');
    const aboutRepo = document.createElement('div');
    const h3 = document.createElement('h3');
    const a = document.createElement('a');
    const desc = document.createElement('div');
    const type = document.createElement('div');
    const color = document.createElement('div');
    const typeName = document.createElement('p');
    const innerStarCount = document.createElement('div');
    const star = document.createElement('i');
    const anotherStar = document.createElement('i');
    const branch = document.createElement('i');
  
    const branchCont = document.createElement('div');
    const updatedOn = document.createElement('p');
    const btn = document.createElement('button');

    //format date
    const date =view.updatedAt.replace(/T.*/g, '')

    //set attributes of the created elements
    repo.setAttribute('class', 'repo')
    aboutRepo.setAttribute('class', 'about-repo')
    a.setAttribute('href', view.url)
    desc.setAttribute('class', 'desc')
    type.setAttribute('class', 'type')
    color.setAttribute('class', 'color')
    star.setAttribute('class', 'fas fa-star')
    anotherStar.setAttribute('class', 'fas fa-star')
    branch.setAttribute('class', 'fas fa-code-branch')
  
    //set innerHtmls
    a.innerHTML = view.name
    a.target='_blanck'

    typeName.innerHTML = view.languages?.nodes[0]?.name
    updatedOn.innerHTML = date

    //set the language type colors
    color.style.background = view.languages?.nodes[0]?.color
    
    //append childs to the appropriate parent
    repoContents.appendChild(repo);
    repo.append(aboutRepo)
    aboutRepo.append(h3)
    h3.append(a)
    aboutRepo.append(desc)
    desc.append(type)
    type.append(color)
    type.appendChild(typeName)
    desc.append(innerStarCount)
    innerStarCount.append(star,view.stargazerCount)
    desc.append(branchCont)
    branchCont.append(branch, view.pullRequests.totalCount)
    desc.append(updatedOn)
    repo.append(btn)
    btn.append(anotherStar,'star')

})

