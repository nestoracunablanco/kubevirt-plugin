import { modelToGroupVersionKind } from '@kubevirt-ui/kubevirt-api/console';
import {
  V1beta1VirtualMachineInstancetype,
  V1InstancetypeMatcher,
} from '@kubevirt-ui/kubevirt-api/kubevirt';
import { getInstanceTypeModelFromMatcher } from '@kubevirt-utils/resources/instancetype/helper';
import { isEmpty } from '@kubevirt-utils/utils/utils';
import useK8sWatchData from '@multicluster/hooks/useK8sWatchData';

type UseInstanceType = (
  instanceTypeMatcher: V1InstancetypeMatcher,
  cluster?: string,
) => {
  instanceType: V1beta1VirtualMachineInstancetype;
  instanceTypeLoaded: boolean;
  instanceTypeLoadError: Error;
};

const useInstanceType: UseInstanceType = (instanceTypeMatcher, cluster) => {
  const [instanceType, instanceTypeLoaded, instanceTypeLoadError] =
    useK8sWatchData<V1beta1VirtualMachineInstancetype>(
      !isEmpty(instanceTypeMatcher) && {
        cluster,
        groupVersionKind: modelToGroupVersionKind(
          getInstanceTypeModelFromMatcher(instanceTypeMatcher),
        ),
        name: instanceTypeMatcher.name,
      },
    );

  return {
    instanceType,
    instanceTypeLoaded,
    instanceTypeLoadError,
  };
};

export default useInstanceType;
