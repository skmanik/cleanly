
import React from "react";

export const Table = ({ children }) => (
    <div className="container">
        <table className="table is-striped">
            <tbody>
                {children}
            </tbody>
        </table>
    </div>
);