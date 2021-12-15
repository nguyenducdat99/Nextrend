import React from "react";
import ProjectCard from "../ProjectCard";
import "./styles.scss";

function ProjectCardList({ projects, width = "" }) {
  return (
    <div className='card-columns project-card-list'>
      {projects.map((project, index) => (
        <ProjectCard
          {...project}
          index={index}
          key={`${project}${project.slug}`}
        />
      ))}
    </div>
  );
}

export default ProjectCardList;
