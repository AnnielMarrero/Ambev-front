import axios from 'axios';
import { date } from 'quasar';
import { Notify } from 'quasar';

export const getInfoFromCep = async (cep: string) => {
  if(!cep) return false;
  //Nova variável "cep" somente com dígitos.
  cep = cep.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep !== '') {
    //Expressão regular para validar o CEP.
    const validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      //make request
       const resp = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
       return resp.data;
    } //end if.
    else {
      return false;
    }
  } //end if.
  else {
    return false;
  }
}

export const validStartEndDates = (startDate: string, endDate: string, format: string): boolean => {
  const ini = date.extractDate(startDate, format).getTime();
  const fin = date.extractDate(endDate, format).getTime();
  //console.log(ini, startDate);
  if(ini < 0 || fin < 0) return true;
  return fin >= ini;
};


export const showAlert = (msg: string, success = false ) => {
  //console.log('showAlert', msg);
  Notify.create({
    color: success ? 'positive' : 'negative',
    position: 'top',
    message: msg,
    icon: success ? 'check' : 'report_problem',
  });
};
/**
 *
 * @param msg custom message
 * @param error axios error or other error
 */
export const handleError = (msg: string, error: unknown) => {
  //console.log("Errro ",error);
  const msgError = axios.isAxiosError(error) ? (error.response?.data.errorMessage ?? error.message) : error;
  showAlert(`${msg}. ${msgError}`);
}


export const applyDefault = (value: string | undefined) => {
  //console.log(value);
  return value ? value : '-';
}

/**
 * Just for test spinner
 * @param ms
 * @returns
 */
export const delay = (ms:number) => new Promise(res => setTimeout(res, ms));
