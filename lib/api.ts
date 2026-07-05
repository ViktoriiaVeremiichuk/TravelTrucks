import axios from 'axios';
import { CamperListResponse } from '../types/camper';

axios.defaults.baseURL = 'https://campers-api.goit.study';

export const getCampers = async (page: number = 1) => {
  const res = await axios.get<CamperListResponse>('/campers', {
    params: { page },
  });
  return res.data;
};
