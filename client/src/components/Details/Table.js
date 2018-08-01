
import React from "react";

export const Table = ({ children }) => (
    <div className="container">
        <table>
            <tbody>
                {children}
            </tbody>
        </table>
    </div>
);