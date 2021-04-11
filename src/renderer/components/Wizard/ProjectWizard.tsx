import React, { useState } from 'react';
import styles from './Wizard.module.scss';
import { WizardDetails } from './Details/WizardDetails';
import Pagination from './Pagination/Pagination';
import { usePagination } from './hooks/usePagination';
import { WizardTemplates } from './Template/WizardTemplates';
import { WizardPackages } from './Packages/WizardPackages';
import { Steps } from '../Steps/Steps';

export const ProjectWizard = () => {
    const { steps } = usePagination();
    return (
        <div className={styles.projectWrapper}>
            <div className={styles.projectContainer}>
                <div className={styles.wizardHeader}>
                    <h2 className={styles.wizardHeaderTitle}>
                        Project Creation Wizard
                    </h2>
                </div>

                {steps == 1 && <WizardDetails />}
                {steps == 2 && <WizardTemplates />}
                {steps == 3 && <WizardPackages />}

                <Pagination />
                <Steps step={steps} />
            </div>
        </div>
    );
};
