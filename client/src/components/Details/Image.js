import React from "react";

export const Image = props => (
    <div>
        <img src={props.src} alt={props.alt}/>
    </div>
);

export default Image;