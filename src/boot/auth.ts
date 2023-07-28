import { boot } from 'quasar/wrappers'

import { msalPlugin } from '../plugins/msalPlugin';
import { msalInstance } from '../authConfig';
import { AuthenticationResult, EventType } from '@azure/msal-browser';

//auth
// The next 2 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
//const navigationClient = new CustomNavigationClient(router);
//msalInstance.setNavigationClient(navigationClient);

export default boot(({ app }) => {

  // Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  }
});


  app.use(msalPlugin, msalInstance);
})


