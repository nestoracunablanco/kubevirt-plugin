import React, { FC } from 'react';

import { DEFAULT_INSTANCETYPE_LABEL } from '@catalog/CreateFromInstanceTypes/utils/constants';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { ANNOTATIONS } from '@kubevirt-utils/resources/template';
import { FormGroup, TextInput } from '@patternfly/react-core';

import { AddBootableVolumeState, SetBootableVolumeFieldType } from '../../utils/constants';

import { InstanceTypeDrilldownSelect } from './components/InstanceTypeDrilldownSelect/InstanceTypeDrilldownSelect';
import PreferenceSelect from './components/PreferenceSelect/PreferenceSelect';

type VolumeMetadataProps = {
  bootableVolume: AddBootableVolumeState;
  deleteLabel: (labelKey: string) => void;
  setBootableVolumeField: SetBootableVolumeFieldType;
};

const VolumeMetadata: FC<VolumeMetadataProps> = ({
  bootableVolume,
  deleteLabel,
  setBootableVolumeField,
}) => {
  const { t } = useKubevirtTranslation();

  const { annotations, labels } = bootableVolume || {};

  return (
    <>
      <PreferenceSelect
        bootableVolume={bootableVolume}
        deleteLabel={deleteLabel}
        setBootableVolumeField={setBootableVolumeField}
      />

      <InstanceTypeDrilldownSelect
        selected={labels?.[DEFAULT_INSTANCETYPE_LABEL]}
        setBootableVolumeField={setBootableVolumeField}
        setSelected={setBootableVolumeField('labels', DEFAULT_INSTANCETYPE_LABEL)}
      />
      <FormGroup label={t('Description')}>
        <TextInput
          onChange={(_, value: string) =>
            setBootableVolumeField('annotations', ANNOTATIONS.description)(value)
          }
          id="description"
          value={annotations?.description}
        />
      </FormGroup>
    </>
  );
};

export default VolumeMetadata;
