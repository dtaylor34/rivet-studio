import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import projectComponents from './projects';
import { trackProjectView } from '../utils/analytics';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const ProjectComponent = projectComponents[slug];
  const project = projects.find((p) => p.slug === slug);

  React.useEffect(() => {
    if (project) trackProjectView(project.title);
  }, [project]);

  if (!ProjectComponent) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 text-center">
        <h1 className="text-3xl text-heading mb-4">Project not found</h1>
        <Link to="/" className="text-accent hover:underline">Return home</Link>
      </div>
    );
  }

  return <ProjectComponent project={project} />;
};

export default ProjectDetailPage;
