import React from "react";
import { Link } from "react-router-dom";

const Placeholder = () => {
  return (
    <article className="story-preview">
      <Link className="link" to="/">
        Title
      </Link>
      <section className="story-info">
        <div>
          <span>Score:</span> 0
        </div>
        <div>
          <span>By:</span> Anonymous
        </div>
        <div>
          <span>Posted:</span> now
        </div>
        <div>
          <span>Comments:</span> 0
        </div>
      </section>
    </article>
  );
};

export default Placeholder;
