function validate(formText, formDate){

    if(formText== ""){
      alert("Please provide a location desired");
      return false;
    }
    if(formDate == ""){
      alert("Please provide a date desired");
      return false;
    }
    return true;
}
export { validate }