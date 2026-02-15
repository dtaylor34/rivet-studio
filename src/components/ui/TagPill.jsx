import React from 'react';

const TagPill = ({ label }) => (
  <span className="px-5 py-2 border border-tag text-body rounded-full text-sm font-light tracking-wide hover:border-heading hover:text-heading transition-colors duration-300">
    {label}
  </span>
);

export default TagPill;
