function deleteSubmit(event){
  event.preventDefault()
  const divMainContainer = document.getElementById('main-container');
  //Remove the oldest first
  const sectionBottom = document.querySelector('.main-section-bottom');
  divMainContainer.removeChild(sectionBottom);

}
export { deleteSubmit }