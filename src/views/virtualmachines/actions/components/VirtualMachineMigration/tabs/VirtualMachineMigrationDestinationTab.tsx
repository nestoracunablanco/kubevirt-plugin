import React, { Dispatch, FC, SetStateAction } from 'react';

import InlineFilterSelect from '@kubevirt-utils/components/FilterSelect/InlineFilterSelect';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { modelToGroupVersionKind, StorageClassModel } from '@kubevirt-utils/models';
import { POPPER_CONTAINER_ID } from '@kubevirt-utils/utils/constants';
import MulticlusterResourceLink from '@multicluster/components/MulticlusterResourceLink/MulticlusterResourceLink';
import useClusterParam from '@multicluster/hooks/useClusterParam';
import { Content, ContentVariants, Label, Stack, StackItem, Title } from '@patternfly/react-core';

type VirtualMachineMigrationDestinationTabProps = {
  defaultStorageClassName: string;
  destinationStorageClass: string;
  setSelectedStorageClass: Dispatch<SetStateAction<string>>;
  sortedStorageClasses: string[];
  vmStorageClassNames: string[];
};

const StorageClassModelGroupVersionKind = modelToGroupVersionKind(StorageClassModel);

const VirtualMachineMigrationDestinationTab: FC<VirtualMachineMigrationDestinationTabProps> = ({
  defaultStorageClassName,
  destinationStorageClass,
  setSelectedStorageClass,
  sortedStorageClasses,
  vmStorageClassNames,
}) => {
  const cluster = useClusterParam();
  const { t } = useKubevirtTranslation();

  return (
    <Stack hasGutter>
      <StackItem>
        <Title headingLevel="h2">{t('Destination StorageClass')}</Title>
        <Content component={ContentVariants.p}>
          {t('Select the destination storage for the VirtualMachine storage migration.')}
        </Content>
      </StackItem>
      <StackItem>
        <InlineFilterSelect
          options={sortedStorageClasses?.map((storageClass) => ({
            children: (
              <>
                <MulticlusterResourceLink
                  cluster={cluster}
                  groupVersionKind={StorageClassModelGroupVersionKind}
                  inline
                  linkTo={false}
                  name={storageClass}
                />
                {vmStorageClassNames.includes(storageClass) && <Label>{t('current')}</Label>}{' '}
                {defaultStorageClassName === storageClass && <Label>{t('default')}</Label>}
              </>
            ),
            value: storageClass,
          }))}
          popperProps={{
            appendTo: () => document.getElementById(POPPER_CONTAINER_ID),
          }}
          selected={destinationStorageClass}
          setSelected={setSelectedStorageClass}
          toggleProps={{ isFullWidth: true, placeholder: t('Select StorageClass') }}
        />
      </StackItem>
    </Stack>
  );
};

export default VirtualMachineMigrationDestinationTab;
