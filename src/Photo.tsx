import React from "react";
import { PhotosList } from "./hooks/usePhotos";

const Photo = React.forwardRef(
  (
    {
      urls: { regular },
      alt_description,
      likes,
      user: {
        name,
        portfolio_url,
        profile_image: { medium },
      },
    }: PhotosList,
    ref: any
  ) => {
    const photoBody = (
      <>
        <img src={regular} alt={alt_description} />
        <div className="photo-info">
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt={name} className="user-img" />
        </a>
      </>
    );

    const content = ref ? (
      <article ref={ref} className="photo">
        {photoBody}
      </article>
    ) : (
      <article className="photo"> {photoBody}</article>
    );

    return content;
  }
);

export default Photo;
