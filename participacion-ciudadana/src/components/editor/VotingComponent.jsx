"use client";
import { useState, useEffect } from 'react';

export const VotingComponent = ({ title = "Votación", endTime: passedEndTime }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [votes, setVotes] = useState({ favor: 0, contra: 0 });
    const [totalVotes, setTotalVotes] = useState(0);
    const [isVotingActive, setIsVotingActive] = useState(false);
    const [isVotingClosed, setIsVotingClosed] = useState(false);
    const [endTime, setEndTime] = useState(null);

    useEffect(() => {
        if (passedEndTime) {
            const endDate = new Date(passedEndTime);
            endDate.setHours(23, 59, 59); // Establece la hora de finalización a 23:59:59
            setEndTime(endDate);
        } else {
            const now = new Date();
            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
            setEndTime(midnight);
        }
    }, [passedEndTime]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            if (endTime) {
                const difference = endTime.getTime() - now.getTime();
                
                if (difference > 0) {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                    setTimeLeft({ days, hours, minutes, seconds });

                    if (!isVotingActive && difference <= (24 * 60 * 60 * 1000)) {
                        setIsVotingActive(true);
                    }
                } else {
                    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                    setIsVotingClosed(true);
                    setIsVotingActive(false);
                    clearInterval(timer);
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime, isVotingActive]);

    const handleVote = (type) => {
        if (!isVotingClosed) {
            setVotes(prev => {
                const newVotes = { ...prev, [type]: prev[type] + 1 };
                const newTotal = newVotes.favor + newVotes.contra;
                setTotalVotes(newTotal);
                return newVotes;
            });
        }
    };

    const favorPercentage = totalVotes > 0 ? (votes.favor / totalVotes) * 100 : 0;
    const contraPercentage = totalVotes > 0 ? (votes.contra / totalVotes) * 100 : 0;

    // Formatear la fecha si `endTime` es válida
    const formatDate = (date) => {
        return date instanceof Date && !isNaN(date) ? 
            date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }) : 'Fecha no válida';
    };

    return (
        <div className="w-full flex justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-xl font-bold text-center mb-4">{title}</h1>
    
                {/* Verificar si endTime es null */}
                {!endTime ? (
                    <p className="text-lg font-semibold text-center">Votaciones no activadas.</p>
                ) : (
                    <div className="text-center mb-4">
                        {isVotingActive ? (
                            <>
                                <p className="text-lg font-semibold">Tiempo Restante:</p>
                                <p className="text-xl font-bold">
                                    {`${timeLeft.hours.toString().padStart(2, '0')} H : ${timeLeft.minutes.toString().padStart(2, '0')} M : ${timeLeft.seconds.toString().padStart(2, '0')} S`}
                                </p>
                            </>
                        ) : (
                            <p className="text-lg font-semibold">
                                {isVotingClosed ? 
                                    "La votación ha terminado." :
                                    `La votación empieza el ${formatDate(endTime)}.`}
                            </p>
                        )}
                    </div>
                )}
    
                {isVotingActive && (
                    <>
                        <p className="text-md mb-2">Total votos: {totalVotes}</p>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold">En contra</span>
                                <span>{votes.contra} ({contraPercentage.toFixed(1)}%)</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-red-500"
                                    style={{ width: `${contraPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold">A favor</span>
                                <span>{votes.favor} ({favorPercentage.toFixed(1)}%)</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500"
                                    style={{ width: `${favorPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleVote('contra')}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded w-full"
                                disabled={isVotingClosed}
                            >
                                En contra
                            </button>
                            <button
                                onClick={() => handleVote('favor')}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded w-full"
                                disabled={isVotingClosed}
                            >
                                A favor
                            </button>
                        </div>
                    </>
                )}
    
                {isVotingClosed && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Resultados de la Votación</h2>
                        <p className="text-md mb-2">Total votos: {totalVotes}</p>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold">En contra</span>
                                <span>{votes.contra} ({contraPercentage.toFixed(1)}%)</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-red-500"
                                    style={{ width: `${contraPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold">A favor</span>
                                <span>{votes.favor} ({favorPercentage.toFixed(1)}%)</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500"
                                    style={{ width: `${favorPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
};
