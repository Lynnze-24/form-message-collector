import React, { FC } from 'react';
import styles from './ProjectCard.module.css';
interface ProjectCardProps {
  children?: React.ReactNode;
  name: string;
  url: string;
  src: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ name, url, src }) => {
  return (
    <div className={styles.card} onClick={() => window.open(url)}>
      <img className={styles.image} alt={name} src={src} />
      <p className={styles.text}>{name}</p>
    </div>
  );
};

export default ProjectCard;
