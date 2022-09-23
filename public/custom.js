(() => {
 'use strict'

 // Fetch all the forms we want to apply custom Bootstrap validation styles to
 const forms = document.querySelectorAll('.needs-validation')

 // Loop over them and prevent submission
 Array.from(forms).forEach(form => {
   form.addEventListener('submit', event => {
     if (!form.checkValidity()) {
       event.preventDefault()
       event.stopPropagation()
     }

     form.classList.add('was-validated')
   }, false)
 })
})();

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    alert('Nice, you triggered this alert message!', 'success')
  })
}

const myCarouselElement = document.querySelector('#carouselExampleSlidesOnly')
if(myCarouselElement){
  const carousel = new bootstrap.Carousel(myCarouselElement, {
    interval: 2000,
    wrap: false
  })
}

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

const toastElList = document.querySelectorAll('.toast')
const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl))