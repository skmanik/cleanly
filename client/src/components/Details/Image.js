import React from "react";

export const Image = props => (
    <div>
        <img src={props.src} alt={props.alt} width="100px" height='100px' />
    </div>
);

export default Image;