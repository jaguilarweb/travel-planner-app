function validate(formText, formDate){

    if(formText && formDate){
      return true;
    }
    return false;
}

export { validate }
