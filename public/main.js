const update = document.querySelector('#update-button')
let trash = document.getElementsByClassName("fa-trash");
const messageDiv = document.querySelector('#message')
let star = document.getElementsByClassName("fa-star");






Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log(element.id)
    fetch('quotes', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': element.id
        
       
        

        
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

// deleteButton.addEventListener('click', _ => {
//     fetch('/quotes', {
//       method: 'delete',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
    
//         'quote': quote
//       })
//     })
//     .then(res => {
//         if (res.ok) return res.json()
//       })

//     .then(response =>{
//         if (response === 'No quote to delete'){
//             messageDiv.textContent = 'No Darth Vader quote to be deleted'
//             console.log('nothing else')
//         }
//     })
//       .then(data => {
//         window.location.reload()
//       })
//   })
  
  
    