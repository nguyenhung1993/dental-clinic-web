import dotenv from 'dotenv';
// Load .env.local first, then .env as fallback
dotenv.config({ path: '.env.local' });
dotenv.config();

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, StaffRole, Gender, AppointmentStatus } from '@prisma/client';
import { hash } from 'bcryptjs';

// Use DIRECT_URL for seeding
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Seeding Dental Clinic database...');

    // ==================== CLEANUP ====================
    console.log('🧹 Cleaning up old data...');
    try {
        // Delete in order of dependencies (children first)
        await prisma.campaign.deleteMany();
        await prisma.patientLoyalty.deleteMany();
        await prisma.payment.deleteMany();
        await prisma.invoiceItem.deleteMany();
        await prisma.invoice.deleteMany();
        await prisma.treatmentNote.deleteMany();
        await prisma.treatmentItem.deleteMany();
        await prisma.treatmentPlan.deleteMany();
        await prisma.appointment.deleteMany();
        await prisma.toothRecord.deleteMany();
        await prisma.dentalChart.deleteMany();
        await prisma.xrayFile.deleteMany();
        await prisma.patient.deleteMany();
        await prisma.staff.deleteMany();
        await prisma.user.deleteMany();
        await prisma.branch.deleteMany();
        await prisma.service.deleteMany();
        await prisma.dentalChair.deleteMany();
        console.log('✅ Cleanup completed');
    } catch (error) {
        console.log('⚠️ Cleanup encounter errors (some tables might be empty or missing):');
    }

    // ==================== BRANCHES ====================
    console.log('🏛️ Creating branches...');
    const hcmBranch = await prisma.branch.create({
        data: {
            name: 'Phoenix Dental - Quận 1',
            address: '123 Nguyễn Huệ, Quận 1, TP. HCM',
            phone: '028.1234.5678',
            isActive: true,
        }
    });

    // ==================== USERS & STAFF ====================
    console.log('👤 Creating users and staff...');
    const password = await hash('123456', 10);

    // Admin
    const adminUser = await prisma.user.create({
        data: {
            name: 'Admin',
            email: 'admin@phoenix.com',
            password,
            role: StaffRole.SUPER_ADMIN,
        }
    });

    await prisma.staff.create({
        data: {
            staffCode: 'ST-001',
            fullName: 'Administrator',
            email: 'admin@phoenix.com',
            phone: '0900000000',
            role: StaffRole.SUPER_ADMIN,
            userId: adminUser.id,
            branchId: hcmBranch.id,
            isActive: true,
        }
    });

    // Doctor
    const doctorUser = await prisma.user.create({
        data: {
            name: 'Dr. John Smith',
            email: 'doctor@phoenix.com',
            password,
            role: StaffRole.DOCTOR,
        }
    });

    const doctorStaff = await prisma.staff.create({
        data: {
            staffCode: 'BS-001',
            fullName: 'Dr. John Smith',
            email: 'doctor@phoenix.com',
            phone: '0911111111',
            role: StaffRole.DOCTOR,
            userId: doctorUser.id,
            branchId: hcmBranch.id,
            specialization: 'Implant',
            licenseNumber: 'CCHN-12345',
            isActive: true,
        }
    });

    // ==================== SERVICES ====================
    console.log('🦷 Creating services...');
    await prisma.service.createMany({
        data: [
            { code: 'DV-001', name: 'Khám tổng quát', category: 'Khám & Chẩn đoán', price: 200000 },
            { code: 'DV-002', name: 'Cạo vôi răng', category: 'Nha khoa tổng quát', price: 500000 },
            { code: 'DV-003', name: 'Trám răng composite', category: 'Nha khoa phục hồi', price: 400000 },
            { code: 'DV-004', name: 'Tẩy trắng răng', category: 'Nha khoa thẩm mỹ', price: 3000000 },
        ]
    });

    // ==================== PATIENTS ====================
    console.log('👥 Creating patients...');
    const maria = await prisma.patient.create({
        data: {
            fullName: 'Maria Santos',
            patientCode: 'BN-0001',
            phone: '0987.654.321',
            email: 'maria@example.com',
            dob: new Date('1990-06-12'),
            gender: Gender.FEMALE,
            address: 'Quận 1, TP. HCM',
            branchId: hcmBranch.id,
        }
    });

    // ==================== LOYALTY ====================
    console.log('💎 Creating loyalty data...');
    await prisma.patientLoyalty.create({
        data: {
            patientId: maria.id,
            points: 1500,
            tier: 'GOLD'
        }
    });

    // ==================== CAMPAIGNS ====================
    console.log('🚀 Creating marketing campaigns...');
    await prisma.campaign.createMany({
        data: [
            {
                name: 'Mùa hè Rạng rỡ - Niềng răng 0đ',
                status: 'ACTIVE',
                budget: 50000000,
                expectedReach: 20000,
                actualReach: 12500,
                leads: 420,
                conversionRate: 0.034,
                channels: ['FB', 'GG', 'Zalo'],
                startDate: new Date('2024-03-01'),
            },
            {
                name: 'Tri ân khách hàng cũ - Voucher 50%',
                status: 'PAUSED',
                budget: 20000000,
                expectedReach: 10000,
                actualReach: 8400,
                leads: 156,
                conversionRate: 0.018,
                channels: ['SMS', 'Email'],
                startDate: new Date('2024-02-15'),
            }
        ]
    });

    // ==================== APPOINTMENTS ====================
    console.log('📅 Creating appointments...');
    await prisma.appointment.create({
        data: {
            appointmentNo: 'AP-20240317-001',
            patientId: maria.id,
            doctorId: doctorStaff.id,
            branchId: hcmBranch.id,
            scheduledAt: new Date(),
            status: AppointmentStatus.COMPLETED,
            chiefComplaint: 'Khám định kỳ',
        }
    });

    console.log('✅ Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
