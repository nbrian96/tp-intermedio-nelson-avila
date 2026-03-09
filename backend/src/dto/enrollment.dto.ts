export interface CreateEnrollmentDTO {
    subjectId: string;
    grade?: number | null;
    status: 'Aprobado' | 'En Curso' | 'Examen Final Pendiente';
}

export interface UpdateEnrollmentDTO {
    grade?: number | null;
    status?: 'Aprobado' | 'En Curso' | 'Examen Final Pendiente';
}

export interface BulkEnrollmentDTO {
    code: string;
    grade?: number | null;
    status: 'Aprobado' | 'En Curso' | 'Examen Final Pendiente';
}

