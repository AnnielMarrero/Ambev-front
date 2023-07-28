import { DropDownInfo, DropDownInfo2, Select } from 'src/core/data/dropdown';
import ApiService from './ApiService';

/**
 * This class is for get all dropDowns that are used multiples times
 */
class DropDownService {

  public static getUnits() {
    return ApiService.get('/api/Enum/GetUnitsDropdownItems')
      .then(resp =>
        resp.data.result.map(DropDownService.mapping));
  }

  public static getBrands() {
    return ApiService.get('/api/Brand/GetDropdownItems?fieldNameValue=id&fieldNameText=name')
      .then(resp =>
        resp.data.result.map(DropDownService.mapping));
  }

  public static getPropietarios() {
    return ApiService.get('/api/Enum/GetEventMakersDropdownItems')
      .then(resp =>
        resp.data.result.map(DropDownService.mapping));
  }

  public static getFilters() {
    return ApiService.get('/api/Enum/GetFilterEnventsDropdownItems')
      .then(resp => {
        const data = resp.data.result;
        data.splice(data.length - 1, 1);
        return data.map(DropDownService.mapping); //remove the last element splice
      });
  }

  public static getRegions() {
    return ApiService.get('/api/RegionStateCity/GetRegions')
      .then(resp =>
        resp.data.map(DropDownService.mapping2));
  }

  public static getStatesByRegion(regionId: number) {
    return ApiService.get(`/api/RegionStateCity/GetSatesPerRegions?regionID=${regionId}`)
      .then(resp =>
        resp.data.map(DropDownService.mapping2));
  }

  public static getCitiesByState(stateId: number) {
    return ApiService.get(`/api/RegionStateCity/GetCitiesPerState?stateID=${stateId}`)
      .then(resp =>
        resp.data.map(DropDownService.mapping2));
  }

  private static mapping(o: DropDownInfo): Select {
    return { label: o.text, value: parseInt(o.value)};
  }

  private static mapping2(o: DropDownInfo2): Select {
    return { label: o.name, value: o.id };
  }
}
export default DropDownService;
