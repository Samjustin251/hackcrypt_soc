import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, trend = 'neutral', icon: Icon }) => {
    const isPositive = trend === 'up';

    return (
        <div className="card">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-muted" style={{ color: 'var(--text-secondary)' }}>{title}</h3>
                {Icon && <Icon size={20} color="var(--accent-primary)" />}
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold">{value}</span>

                {change && (
                    <div className="flex items-center gap-1 text-sm">
                        {isPositive ? (
                            <ArrowUpRight size={16} color="var(--severity-high)" />
                        ) : (
                            <ArrowDownRight size={16} color="var(--severity-low)" />
                        )}
                        <span style={{
                            color: isPositive ? 'var(--severity-high)' : 'var(--severity-low)'
                        }}>
                            {change}
                        </span>
                        <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>vs last hour</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
