import { useEffect } from 'react';

const SITE_NAME = 'CipherSQL Studio';
const BASE_DESC =
  'Master SQL by writing real queries. 30+ hands-on assignments backed by a live PostgreSQL sandbox. ' +
  'Get AI hints, track progress, and build real database skills - no setup required.';

/**
 * useMeta — updates document <title> and meta[name="description"] per page.
 *
 * @param {object} options
 * @param {string} [options.title]       Page-specific title. Appended as "title - CipherSQL Studio".
 * @param {string} [options.description] Page-specific meta description.
 */
const useMeta = ({ title, description } = {}) => {
  useEffect(() => {
    const prevTitle = document.title;

    // Set title
    document.title = title ? `${title} - ${SITE_NAME}` : `${SITE_NAME} - Interactive SQL Learning Sandbox`;

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : null;
    if (metaDesc) {
      metaDesc.setAttribute('content', description || BASE_DESC);
    }

    // Set OG title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const prevOgTitle = ogTitle ? ogTitle.getAttribute('content') : null;
    if (ogTitle) {
      ogTitle.setAttribute('content', title ? `${title} - ${SITE_NAME}` : `${SITE_NAME} - Interactive SQL Learning Sandbox`);
    }

    // Set OG description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const prevOgDesc = ogDesc ? ogDesc.getAttribute('content') : null;
    if (ogDesc) {
      ogDesc.setAttribute('content', description || BASE_DESC);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc !== null) metaDesc.setAttribute('content', prevDesc);
      if (ogTitle && prevOgTitle !== null) ogTitle.setAttribute('content', prevOgTitle);
      if (ogDesc && prevOgDesc !== null) ogDesc.setAttribute('content', prevOgDesc);
    };
  }, [title, description]);
};

export default useMeta;
