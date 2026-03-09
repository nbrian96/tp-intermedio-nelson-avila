import Career from '../models/career.model';
import Subject from '../models/subject.model';
import Enrollment from '../models/enrollment.model';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

const defaultCareers = [
    { name: 'Ingeniería en Informática', plan: 'Plan 2023', code: 'INF-2023' }
];

const defaultSubjects = [
    { name: 'ALGEBRA A (CBC62)', code: 'CBC62', type: 'Materia', year: 1, period: '1er Cuatrimestre', credits: 9 },
    { name: 'ANÁLISIS MATEMÁTICO A (CBC66)', code: 'CBC66', type: 'Materia', year: 1, period: '1er Cuatrimestre', credits: 9 },
    { name: 'FÍSICA (CBC03)', code: 'CBC03', type: 'Materia', year: 1, period: '1er Cuatrimestre', credits: 6 },
    { name: 'INTRODUCCIÓN AL CONOCIMIENTO DE LA SOCIEDAD Y EL ESTADO (CBC24)', code: 'CBC24', type: 'Materia', year: 1, period: '2do Cuatrimestre', credits: 4 },
    { name: 'INTRODUCCIÓN AL PENSAMIENTO CIENTÍFICO (CBC40)', code: 'CBC40', type: 'Materia', year: 1, period: '2do Cuatrimestre', credits: 4 },
    { name: 'PENSAMIENTO COMPUTACIONAL (CBC90)', code: 'CBC90', type: 'Materia', year: 1, period: '2do Cuatrimestre', credits: 6 },
    { name: 'ANÁLISIS MATEMÁTICO II (CB001)', code: 'CB001', type: 'Materia', year: 2, period: '3er Cuatrimestre', credits: 8, correlative: ['CBC62', 'CBC66', 'CBC03', 'CBC24', 'CBC40', 'CBC90'] },
    { name: 'FUNDAMENTOS DE PROGRAMACIÓN (TB021)', code: 'TB021', type: 'Materia', year: 2, period: '3er Cuatrimestre', credits: 6, correlative: ['CBC62', 'CBC66', 'CBC03', 'CBC24', 'CBC40', 'CBC90'] },
    { name: 'INTRODUCCIÓN AL DESARROLLO DE SOFTWARE (TB022)', code: 'TB022', type: 'Materia', year: 2, period: '3er Cuatrimestre', credits: 6, correlative: ['CBC62', 'CBC66', 'CBC03', 'CBC24', 'CBC40', 'CBC90'] },
    { name: 'ÁLGEBRA LINEAL (CB002)', code: 'CB002', type: 'Materia', year: 2, period: '4to Cuatrimestre', credits: 8, correlative: ['CBC62', 'CBC66', 'CBC03', 'CBC24', 'CBC40', 'CBC90'] },
    { name: 'ORGANIZACIÓN DEL COMPUTADOR (TB023)', code: 'TB023', type: 'Materia', year: 2, period: '4to Cuatrimestre', credits: 6, correlative: ['TB022', 'TB021'] },
    { name: 'ALGORITMOS Y ESTRUCTURAS DE DATOS (CB100)', code: 'CB100', type: 'Materia', year: 2, period: '4to Cuatrimestre', credits: 6, correlative: ['TB021'] },
    { name: 'PROBABILIDAD Y ESTADÍSTICA (CB003)', code: 'CB003', type: 'Materia', year: 3, period: '5to Cuatrimestre', credits: 6, correlative: ['CB001', 'CB002'] },
    { name: 'TEORÍA DE ALGORITMOS (TB024)', code: 'TB024', type: 'Materia', year: 3, period: '5to Cuatrimestre', credits: 6, correlative: ['CB100', 'TB022'] },
    { name: 'SISTEMAS OPERATIVOS (TA043)', code: 'TA043', type: 'Materia', year: 3, period: '5to Cuatrimestre', credits: 6, correlative: ['TB023'] },
    { name: 'PARADIGMAS DE PROGRAMACIÓN (TB025)', code: 'TB025', type: 'Materia', year: 3, period: '5to Cuatrimestre', credits: 6, correlative: ['CB100', 'TB022'] },
    { name: 'BASE DE DATOS (TA044)', code: 'TA044', type: 'Materia', year: 3, period: '6to Cuatrimestre', credits: 6, correlative: ['TB023', 'TB025'] },
    { name: 'MODELACIÓN NUMÉRICA (CB051)', code: 'CB051', type: 'Materia', year: 3, period: '6to Cuatrimestre', credits: 4, correlative: ['CB001', 'CB002', 'CB100'] },
    { name: 'TALLER DE PROGRAMACIÓN (TA045)', code: 'TA045', type: 'Materia', year: 3, period: '6to Cuatrimestre', credits: 8, correlative: ['TB023', 'TB025'] },
    { name: 'INGENIERÍA DE SOFTWARE I (TA046)', code: 'TA046', type: 'Materia', year: 3, period: '6to Cuatrimestre', credits: 8, correlative: ['TB023', 'TB025'] },
    { name: 'CIENCIA DE DATOS (TA047)', code: 'TA047', type: 'Materia', year: 4, period: '7mo Cuatrimestre', credits: 6, correlative: ['CB003', 'TA044', 'CB051', 'TB024'] },
    { name: 'GESTIÓN DEL DESARROLLO DE SISTEMAS INFORMÁTICOS (TC017)', code: 'TC017', type: 'Materia', year: 4, period: '7mo Cuatrimestre', credits: 6, correlative: ['TA046'] },
    { name: 'PROGRAMACIÓN CONCURRENTE (TB026)', code: 'TB026', type: 'Materia', year: 4, period: '7mo Cuatrimestre', credits: 6, correlative: ['TA043', 'TA045'] },
    { name: 'REDES (TA048)', code: 'TA048', type: 'Materia', year: 4, period: '7mo Cuatrimestre', credits: 6, correlative: ['TA043'] },
    { name: 'FÍSICA PARA INFORMÁTICA (CB024)', code: 'CB024', type: 'Materia', year: 4, period: '8vo Cuatrimestre', credits: 4, correlative: [120] },
    { name: 'EMPRESAS DE BASE TECNOLÓGICA I (TC018)', code: 'TC018', type: 'Materia', year: 4, period: '8vo Cuatrimestre', credits: 6, correlative: [120] },
    { name: 'INGENIERÍA DE SOFTWARE II (TA049)', code: 'TA049', type: 'Materia', year: 4, period: '8vo Cuatrimestre', credits: 8, correlative: ['TA044', 'TA046', 'TA045'] },
    { name: 'SISTEMAS DISTRIBUIDOS I (TA050)', code: 'TA050', type: 'Materia', year: 4, period: '8vo Cuatrimestre', credits: 6, correlative: ['TB026', 'TA048'] },
    { name: 'TALLER DE SEGURIDAD INFORMÁTICA (TA051)', code: 'TA051', type: 'Materia', year: 5, period: '9no Cuatrimestre', credits: 8, correlative: ['TA048'] },
    { name: 'EMPRESAS DE BASE TECNOLÓGICA II (TC019)', code: 'TC019', type: 'Materia', year: 5, period: '10mo Cuatrimestre', credits: 6, correlative: ['TC018'] },
    { name: 'TESIS DE INGENIERÍA INFORMÁTICA (TA052)', code: 'TA052', type: 'Tesis', year: 5, period: 'Anual', credits: 12, correlative: [140] },
    { name: 'TRABAJO PROFESIONAL DE INGENIERÍA INFORMÁTICA (TA053)', code: 'TA053', type: 'Tesis', year: 5, period: 'Anual', credits: 12, correlative: [140] },
    { name: 'PRÁCTICA PROFESIONAL DE INGENIERÍA EN INFORMÁTICA (PPS-IF-2023)', code: 'PPS-IF-2023', type: 'Actividad Extracurricular' },
    { name: 'PRUEBA DE DOMINIO IDIOMA INGLÉS (RID-2023)', code: 'RID-2023', type: 'Materia' },
    { name: 'LENGUAJES Y COMPILADORES I (TB027)', code: 'TB027', type: 'Materia', mandatory: false },
    { name: 'CET. FÍSICA I A (CET-6201)', code: 'CET-6201', type: 'Materia', mandatory: false },
    { name: 'CET. QUÍMICA (CET-6301)', code: 'CET-6301', type: 'Materia', mandatory: false },
    { name: 'CET. LABORATORIO (CET-6602)', code: 'CET-6602', type: 'Materia', mandatory: false },
    { name: 'CET. FÍSICA II (CET-6203)', code: 'CET-6203', type: 'Materia', mandatory: false },
    { name: 'CET-ANÁLISIS NUMÉRICO (CET-7512)', code: 'CET-7512', type: 'Materia', mandatory: false }
];

export const seedCareers = async () => {
    try {
        for (const careerData of defaultCareers) {
            const exists = await Career.findOne({ code: careerData.code });
            if (!exists) {
                await Career.create(careerData);
                console.log(`Career seeded: ${careerData.name} (${careerData.code})`);
            }
        }

        const infCareer = await Career.findOne({ code: 'INF-2023' });
        if (infCareer) {
            for (const subjectData of defaultSubjects) {
                const exists = await Subject.findOne({ code: subjectData.code });
                if (!exists) {
                    await Subject.create({
                        ...subjectData,
                        careerId: infCareer._id
                    });
                    console.log(`Subject seeded: ${subjectData.name} (${subjectData.code})`);
                }
            }
        }

        console.log('Seeding completed');
    } catch (error) {
        console.error('Error in seeding process:', error);
    }
};


