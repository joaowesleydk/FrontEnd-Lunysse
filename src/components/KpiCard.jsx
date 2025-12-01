import React from "react";
import { Card } from "./Card";

export const KpiCard = ({ icon, value, label }) => {
    return (
        <Card className="text-center">
            <div className="mx-auto mb-2"> {icon}</div>
            <h3 className="text-2xl font-bold text-dark">{value}</h3>
            <p className="text-dark/70"></p>
        </Card>
    );
};