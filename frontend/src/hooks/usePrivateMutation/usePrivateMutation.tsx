import { MutationKey, useMutation } from '@tanstack/react-query';
import Axios from '../../utils/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { AxiosInstance, AxiosResponse } from 'axios';
import { useToast } from '../useToast/useToast';

interface PrivateMutationOpts {
  mutationKey: MutationKey;
  mutationResFn: (Axios: AxiosInstance, paras: any) => Promise<AxiosResponse>;
  onMutate?: (para: any) => void;
  successMsg?: string;
  onSuccess?: (data: any) => void;
  onError?: (err: Error) => void;
}

export default function usePrivateMutation(opts: PrivateMutationOpts) {
  const { data: userData } = useSelector((state: RootState) => state.user);

  const {
    mutationKey,
    mutationResFn,
    onMutate,
    successMsg,
    onSuccess,
    onError,
  } = opts;

  const { openToast } = useToast();

  const mutationFn = async (paras: any) => {
    Axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${userData?.token}`;
    const res = await mutationResFn(Axios, paras);
    return res.data;
  };

  const errorHandler = (err: any) => {
    if (err?.response?.data?.message) {
      return openToast(err.response.data.message, 'error');
    }
    openToast(err.message, 'error');
  };

  const successHandler = successMsg
    ? () => openToast(successMsg, 'success')
    : onSuccess;

  return useMutation({
    mutationKey,
    mutationFn,
    onMutate: onMutate ? onMutate : (para) => console.log(para),
    onSuccess: successHandler,
    onError: onError ? onError : errorHandler,
  });
}
