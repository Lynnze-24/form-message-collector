import React, { FC } from 'react';
import styles from './ProjectList.module.css';
import threeJSPort from '../../../../assets/images/clientWebsites/3dPort.jpg';
import firstPort from '../../../../assets/images/clientWebsites/port.jpg';
import scarlettPort from '../../../../assets/images/clientWebsites/scarlett.jpg';
import ProjectCard from '../projectCard/ProjectCard';

interface ProjectListProps {
  children?: React.ReactNode;
}

const projects = [
  {
    name: 'Three JS Portfolio',
    url: 'https://aunghtetlinn.vercel.app',
    src: threeJSPort,
  },
  {
    name: 'First Portfolio',
    url: 'https://aunghtetlinn.infinityfreeapp.com/',
    src: firstPort,
  },
  {
    name: 'Scarlett Portfolio',
    url: 'https://portfolio-scarlett.netlify.app/',
    src: scarlettPort,
  },
];

const ProjectList: FC<ProjectListProps> = ({}) => {
  return (
    <div className={styles.projectListCon}>
      <h2 className={styles.projHead}>Client Websites</h2>
      <div className={styles.listCon}>
        {projects.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
