import React from "react";

const StoryPreviewPlaceholder = () => {
  return (
    <article className="story-preview">
      <div className="skeleton-item">
        <div>
          <div className="skeleton-block" style={{ maxWidth: "500px" }}>
            {" "}
          </div>
        </div>
        <div>
          <div className="skeleton-block" style={{ maxWidth: "50px" }}>
            {" "}
          </div>
          <div className="skeleton-block" style={{ maxWidth: "100px" }}>
            {" "}
          </div>
          <div className="skeleton-block" style={{ maxWidth: "100px" }}>
            {" "}
          </div>
          <div className="skeleton-block" style={{ maxWidth: "100px" }}>
            {" "}
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoryPreviewPlaceholder;
