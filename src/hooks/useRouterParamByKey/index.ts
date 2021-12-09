import { useRouter } from "@tarojs/taro";

const useRouterParamByKey = <T extends string>(key: string) => {
  const router = useRouter();
  const val = router.params?.[key] ?? undefined;
  return val as (T | undefined);
};

export default useRouterParamByKey;
