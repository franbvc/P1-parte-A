// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the buttons that opens the modal
// var allBtns = document.getElementById("edit-btn");

// // Get the <span> elements that closes the modals
// var spans = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// Get the button that opens the modal
var modalBtns = document.querySelectorAll("button.modal-button");

// All page modal
var modal = document.querySelector('.modal');

// Get the <span> element that closes the modal
var spans = document.getElementsByClassName("close");

for( let i = 0; i < modalBtns.length; i ++){
    modalBtns[i].addEventListener("click", function(){
      modal.style.visibility = "visible";
    } );
}

for( let i = 0; i < spans.length; i ++){
  spans[i].addEventListener("click", function(){
    modal.style.visibility = "hidden";
  } );
}

// for( let i = 0; i < spans.length; i ++){
//   spans[i].addEventListener("click", function(){
//     modal.classList.remove('modal-active')
//   } );
// }

// // When the user clicks the button, open the modal
// for (var i = 0; i < btn.length; i++) {
//  btn[i].onclick = function(e) {
//     e.preventDefault();
//     modal = document.querySelector(e.target.getAttribute("href"));
//     modal.style.display = "block";
//  }
// }

// // When the user clicks on <span> (x), close the modal
// for (var i = 0; i < spans.length; i++) {
//  spans[i].onclick = function() {
//     for (var index in modals) {
//       if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
//     }
//  }
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target.classList.contains('modal')) {
//      for (var index in modals) {
//       if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
//      }
//     }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener("DOMContentLoaded", function () {
  // Faz textarea aumentar a altura automaticamente
  // Fonte: https://www.geeksforgeeks.org/how-to-create-auto-resize-textarea-using-javascript-jquery/#:~:text=It%20can%20be%20achieved%20by,height%20of%20an%20element%20automatically.
  let textareas = document.getElementsByClassName("autoresize");
  for (let i = 0; i < textareas.length; i++) {
    let textarea = textareas[i];
    function autoResize() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }

    textarea.addEventListener("input", autoResize, false);
  }

  // Sorteia classes de cores aleatoriamente para os cards
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    card.className += ` card-color-${getRandomInt(
      1,
      5
    )} card-rotation-${getRandomInt(1, 11)}`;
  }
});
