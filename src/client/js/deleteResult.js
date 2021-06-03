function deleteSubmit(event){
  event.preventDefault()
  const divParentContainer = document.querySelector('.main-section-bottom');
  //Remove the oldest first
  const articleReset = document.querySelector('article');
  divParentContainer.removeChild(articleReset);

}
export { deleteSubmit }