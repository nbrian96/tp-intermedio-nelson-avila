import Enrollment, { IEnrollment } from '../models/enrollment.model';
import Subject, { ISubject } from '../models/subject.model';
import { CreateEnrollmentDTO, UpdateEnrollmentDTO, BulkEnrollmentDTO } from '../dto/enrollment.dto';

export class EnrollmentService {
    async findByStatus(userId: string, status: string): Promise<IEnrollment[]> {
        return await Enrollment.find({ userId, status, deleted: false })
            .populate('subjectId');
    }

    async getEligibleSubjects(userId: string): Promise<ISubject[]> {
        const userEnrollments = await Enrollment.find({ userId, deleted: false })
            .populate('subjectId');

        const approvedEnrollments = userEnrollments.filter(e => e.status === 'Aprobado');
        const approvedCodes = approvedEnrollments.map(e => (e.subjectId as any).code);

        const inProgressOrApprovedIds = userEnrollments
            .filter(e => e.status === 'Aprobado' || e.status === 'En Curso' || e.status === 'Examen Final Pendiente')
            .map(e => e.subjectId.toString());

        const totalCreditsApproved = approvedEnrollments.reduce((acc, e) => acc + ((e.subjectId as any).credits || 0), 0);

        const allSubjects = await Subject.find({ deleted: false });

        return allSubjects.filter(subject => {
            if (inProgressOrApprovedIds.includes(subject._id.toString())) {
                return false;
            }

            if (!subject.correlative || subject.correlative.length === 0) {
                return true;
            }

            return subject.correlative.every(req => {
                if (typeof req === 'number') {
                    return totalCreditsApproved >= req;
                } else if (typeof req === 'string') {
                    return approvedCodes.includes(req);
                }
                return true;
            });
        });
    }

    async bulkCreate(data: BulkEnrollmentDTO[], userId: string): Promise<void> {
        for (const item of data) {
            console.log(item);
            console.log('find subject');
            const subject = await Subject.findOne({ code: item.code, deleted: false });
            if (subject) {
                console.log('subject found');
                const exists = await Enrollment.findOne({ subjectId: subject._id, userId, deleted: false });
                if (!exists) {
                    console.log('enrollment not found');
                    await Enrollment.create({
                        subjectId: subject._id,
                        userId,
                        grade: item.grade,
                        status: item.status
                    });
                    console.log('enrollment created');
                }
            }
        }
    }

    async create(data: CreateEnrollmentDTO, userId: string): Promise<IEnrollment> {
        return await Enrollment.create({ ...data, userId });
    }

    async findAll(userId: string): Promise<IEnrollment[]> {
        return await Enrollment.find({ userId, deleted: false }).populate('subjectId');
    }

    async findById(id: string, userId: string): Promise<IEnrollment | null> {
        return await Enrollment.findOne({ _id: id, userId, deleted: false }).populate('subjectId');
    }

    async update(id: string, data: UpdateEnrollmentDTO, userId: string): Promise<IEnrollment | null> {
        return await Enrollment.findOneAndUpdate(
            { _id: id, userId, deleted: false },
            data,
            { new: true }
        ).populate('subjectId');
    }

    async delete(id: string, userId: string): Promise<IEnrollment | null> {
        return await Enrollment.findOneAndUpdate(
            { _id: id, userId, deleted: false },
            { deleted: true, deletedAt: new Date() },
            { new: true }
        );
    }
}
