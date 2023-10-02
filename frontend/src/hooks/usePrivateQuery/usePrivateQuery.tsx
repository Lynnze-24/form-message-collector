import { QueryKey, useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { AxiosInstance, AxiosResponse } from 'axios';

export default function usePrivateQuery(
  queryKey: QueryKey,
  queryResFn: (Axios: AxiosInstance) => Promise<AxiosResponse>,
  onSuccess?: (data: any) => void,
  enabled?: boolean
) {
  const { data: userData } = useSelector((state: RootState) => state.user);

  const queryFn = async () => {
    Axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${userData?.token}`;
    const res = await queryResFn(Axios);
    return res.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    onError: (err) => console.log(err),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess,
    enabled,
  });
}
