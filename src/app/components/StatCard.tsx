import React, { JSX } from 'react';

interface StatCardProps {
    title: string;
    value: string;
    percentage: string;
    icon: JSX.Element;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, percentage, icon }) => {
    return (
        <div className="flex items-center shadow justify-between p-4 bg-white rounded-md">
            <div>
                <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
                    {title}
                </h6>
                <span className="text-xl font-semibold">{value}</span>
                <span className="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
                    {percentage}
                </span>
            </div>
            <div>
                <span>{icon}</span>
            </div>
        </div>
    );
};

export default StatCard;
