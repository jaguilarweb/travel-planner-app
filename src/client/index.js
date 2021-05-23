import { handleSubmit } from './js/formHandler';

import './styles/stylesheet.scss';


window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submitBtn').addEventListener('click', handleSubmit);
});

export {
  handleSubmit
 }
