import React from 'react';
import { Link } from 'react-router-dom';
import TagPill from './TagPill';
import { trackProjectClick } from '../../utils/analytics';

const ProjectCard = ({ title, subtitle, tags, image, slug }) => {
  return (
    <Link
      to={`/project/${slug}`}
      onClick={() => trackProjectClick(title, 'card_list')}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-32 text-left w-full hover:opacity-90 transition-opacity block"
    >
      <div className="bg-base rounded-2xl p-8 lg:p-12">
        <img
          src={image}
          alt={title}
          className="w-full h-auto rounded-lg shadow-2xl"
        />
      </div>

      <div>
        <div className="flex flex-wrap gap-3 mb-6">
          {tags.map((tag, index) => (
            <TagPill key={index} label={tag} />
          ))}
        </div>

        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light text-heading mb-6 leading-tight tracking-tight">
          <span className="font-normal">{title}</span>
          {subtitle && (
            <>
              <span className="text-faint"> — </span>
              <span className="text-muted">{subtitle}</span>
            </>
          )}
        </h2>
        <p className="text-muted text-lg">Click to view full case study →</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
