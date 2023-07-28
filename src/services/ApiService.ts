import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';

class ApiService {

  public static get(resource: string): Promise<AxiosResponse> {
    //console.log('get init');
    return api.get(resource);
  }

  public static post(
    resource: string,
    params: unknown
  ): Promise<AxiosResponse> {
    return api.post(resource, params);
  }

  public static put(
    resource: string,
    params: unknown
  ): Promise<AxiosResponse> {
    return api.put(resource, params);
  }

  public static delete(
    resource: string
  ): Promise<AxiosResponse> {
    return api.delete(resource);
  }
}
export default ApiService;
