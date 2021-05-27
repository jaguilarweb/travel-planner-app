function minDate(){
  //Add min attribute to choose date from today to future. Not past dates allowed.
  const today = new Date();
  const inputDate = document.getElementById('date');
  //Reference: https://www.iteramos.com/pregunta/5608/javascript-anadir-ceros-a-la-izquierda-hasta-la-fecha
  let todayParse  = today.getFullYear() + '-' +('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  inputDate.setAttribute('min', todayParse );

}
export { minDate }





