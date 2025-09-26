import React from "react";

export const UpcomingAppointmentItem = ({ appointment, patient}) => {
    const statusClasses ={
        agendado: 'bg-blue-100 text-blue-800',
        iniciado: 'bg-blue-100 text-blue-800',
        concluido: 'bg-blue-100 text-blue-800',
    };
    
    const statusLabel = {
        agendado: 'Agendado',
        iniciado: 'Iniciado',
        concluido: 'Concluído',
    };
    
    
    return (
        <div className="flex justify-between items-center np-3 bg-white/10 rounded-lg">
            <div>
                <p className="font-medium text-dark">{patient?.name || 'Paciente não encontrado'} </p>
                <p className="text-sm text-dark/70 "> 
                {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}</p>
                <p className="text-xs text-dark/60">{appointment.description}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[appointment.status]}`}>
                {statusLabel[appointment.status] || 'Desconhecido'}
            </span>

        </div>
    )
}