const plusIcon = document.getElementById('plusIcon')
const userPanel = document.getElementById('userPanel')
const user1Card = document.getElementById('user1')
const user2Card = document.getElementById('user2')
const user1Name = user1Card.dataset.username
const user2Name = user2Card.dataset.username
const input = document.getElementById('message')
const sendIcon = document.getElementById('sendIcon')
const container = document.getElementById('container')
let userDetails = {}
let storeDetails = JSON.parse(localStorage.getItem('details')) || []


plusIcon.addEventListener('click', () => {
  user1Card.style.width = '8rem'
  user2Card.style.width = '8rem'
  if (userPanel.classList.contains('hidden')) {
    userPanel.classList.add('flex')
    userPanel.classList.remove('hidden')
  } else {
      userPanel.classList.add('hidden')
      userPanel.classList.remove('flex')
  }
})

user1Card.addEventListener('click', (e) => {
  e.currentTarget.style.width = '100%'
  e.currentTarget.nextElementSibling.style.width = '8rem'
});
user2Card.addEventListener('click', (e) => {
  e.currentTarget.style.width = '100%'
  e.currentTarget.previousElementSibling.style.width = '8rem'
});

user1Card.addEventListener('dblclick', (e) => {
  userDetails.name = e.currentTarget.dataset.username;
  userPanel.classList.add('hidden')
  input.style.border = '1.7px #F59E0B solid'
});
user2Card.addEventListener('dblclick', (e) => {
  userDetails.name = e.currentTarget.dataset.username;
  userPanel.classList.add('hidden')
  input.style.border = '1.7px #EF4444 solid'
});

input.addEventListener('input', () => {
  if (userDetails.name == undefined) return
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const timeStr = `${hours}:${minutesStr}${ampm}`;
  userDetails.message = input.value.trim()
  userDetails.date = timeStr
})
input.addEventListener('blur', () => {
  if (input.value !== '') {
    input.value = ''
  }
  setTimeout(() => {
  if (document.activeElement !== sendIcon) {
    input.style.border = '1px #4B5563 solid';
  }
}, 150);
});
sendIcon.addEventListener('click', () => {
  if (!userDetails.name || !userDetails.message || !userDetails.date) return
  storeDetails.push(userDetails)
  localStorage.setItem('details', JSON.stringify(storeDetails))
  sendMessage(userDetails)
  input.value = ''
  input.style.border = '1px #4B5563 solid'
  userDetails = {}
})
function loadChats(storeArr) {
  storeArr.forEach(
    item => {
    sendMessage(item)
  })
}
loadChats(storeDetails)
function sendMessage(userDetails) {
  if (userDetails.name == user1Name) {
    let div = document.createElement('div')
    div.id = `user1Text${Date.now()}`
    div.className = 'mt-2 mb-2 bg-[#F59E0B] p-2 w-[65%] rounded-xl flex flex-col justify-between self-end ';
    div.innerHTML = `<span class="self-start mb-1 font-bold text-slate-100 text-sm">${userDetails.name}</span>
   <p class="text-white text-md">${userDetails.message}</p> 
    <span class="self-end mt-1 text-slate-800 text-sm">${userDetails.date}</span>`
    container.appendChild(div)
  }
  else if (userDetails.name == user2Name) {
    let div = document.createElement('div')
    div.id = `user2Text${Date.now()}`
    div.className = 'self-start mt-2 mb-2 bg-[#EF4444] p-2 w-[65%] rounded-xl flex flex-col justify-between'
    div.innerHTML = `
  <span class="self-start mb-1 font-bold text-slate-100 text-sm">${userDetails.name}</span>
  <p class="text-white text-md">${userDetails.message}</p>
  <span class="self-end mt-1 text-slate-800 text-sm">${userDetails.date}</span>`
    container.appendChild(div)
  }
  container.scrollTop = container.scrollHeight;
}