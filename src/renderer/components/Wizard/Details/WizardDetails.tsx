import React, { useEffect, useState } from 'react';
import { Button } from '../../../ui';
import { BorderedInput } from '../../../ui/BorderedInput/BorderedInput';
import { useProject } from '../hooks/useProject';
import styles from '../Wizard.module.scss';

const { dialog } = window.require('@electron/remote');
const { ipcRenderer } = window.require('electron');

export const WizardDetails = () => {
    const [path, setPath] = useState<any>('');
    const [error, setError] = useState<null | string>(null);
    const [resourceName, setResourceName] = useState('');
    const [author, setAuthor] = useState('');
    const [version, setVersion] = useState('');
    const [description, setDescription] = useState('');
    const { project, setProject } = useProject();

    const handlePath = () => {
        console.log('path');
        const selectedPath = dialog.showOpenDialogSync({
            title: 'Choose path to install boilerplate',
            buttonLabel: 'Select',
            properties: ['openDirectory'],
        });
        setPath(selectedPath);

        localStorage.setItem('previousPath', selectedPath); // Store the new path in local storage
    };

    // Used to check if we have a stored path in our local storage
    useEffect(() => {
        const prevPath = localStorage.getItem('previousPath');
        if (prevPath) setPath([prevPath]);

        if (project) {
            setAuthor(project.author);
            setResourceName(project.resource);
            setVersion(project.version);
            setDescription(project.description);
            setPath(project.path);
        }
    }, []);

    useEffect(() => {
        return () => {
            setProject({
                path: path,
                resource: resourceName,
                author: author,
                version: version,
                description: description,
                templateType: project ? project.templateType : null,
            });
        };
    }, [resourceName, author, version, description]);

    return (
        <div style={{ marginTop: 20, width: '100%', flex: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <BorderedInput
                    placeholder="Project Path..."
                    width="85%"
                    type="text"
                    value={path}
                />
                <Button onClick={handlePath}>Browse</Button>
            </div>

            {/* This should def be a reusable component, but rn I am lazy */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '86.5%',
                    marginTop: 20,
                }}
            >
                {/* This should def be a reusable component, but rn I am lazy */}
                <div className={styles.underlineInputWrapper}>
                    <label className={styles.optionLabel}>Project Name</label>
                    <BorderedInput
                        width="95%"
                        type="text"
                        placeholder="My Cool Project"
                        value={resourceName}
                        onChange={(e) => setResourceName(e.currentTarget.value)}
                    />
                </div>

                <div className={styles.underlineInputWrapper}>
                    <label className={styles.optionLabel}>Author</label>
                    <BorderedInput
                        width="95%"
                        type="text"
                        placeholder="Your Name..."
                        value={author}
                        onChange={(e) => setAuthor(e.currentTarget.value)}
                    />
                </div>

                <div className={styles.underlineInputWrapper}>
                    <label className={styles.optionLabel}>Version</label>
                    <BorderedInput
                        width="95%"
                        type="text"
                        placeholder="1.0.0"
                        value={version}
                        onChange={(e) => setVersion(e.currentTarget.value)}
                    />
                </div>

                <div>
                    {error && <p className={styles.errorText}>{error}</p>}
                </div>
            </div>

            <div style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label className={styles.optionLabel}>Description</label>
                    <BorderedInput
                        placeholder="A new RP server"
                        width="85%"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                    />
                </div>
            </div>
        </div>
    );
};
