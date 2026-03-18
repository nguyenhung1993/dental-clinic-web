import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET /api/employees - List staff with optional filters
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const branchId = searchParams.get('branchId');
        const role = searchParams.get('role');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');

        const where: any = {};

        if (branchId) where.branchId = branchId;
        if (role) where.role = role;
        if (search) {
            where.OR = [
                { fullName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { staffCode: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [staffMembers, total] = await Promise.all([
            prisma.staff.findMany({
                where,
                include: {
                    branch: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.staff.count({ where }),
        ]);

        return NextResponse.json({
            data: staffMembers,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('GET /api/employees error:', error);
        return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
    }
}

// POST /api/employees - Create new staff member
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
        }

        const body = await request.json();
        const {
            staffCode, fullName, email, phone, dob, gender,
            branchId, hireDate, address, role, specialization, 
            licenseNumber, isActive
        } = body;

        if (!staffCode || !fullName || !email || !hireDate || !branchId) {
            return NextResponse.json(
                { error: 'Thiếu thông tin bắt buộc: Mã NV, Họ tên, Email, Ngày vào làm, Chi nhánh' },
                { status: 400 }
            );
        }

        // Check for duplicate
        const existingCode = await prisma.staff.findUnique({
            where: { staffCode }
        });
        if (existingCode) {
            return NextResponse.json({ error: 'Mã nhân viên đã tồn tại' }, { status: 400 });
        }

        const existingEmail = await prisma.staff.findUnique({
            where: { email }
        });
        if (existingEmail) {
            return NextResponse.json({ error: 'Email đã tồn tại' }, { status: 400 });
        }

        const staff = await prisma.staff.create({
            data: {
                staffCode,
                fullName,
                email,
                phone,
                dob: dob ? new Date(dob) : undefined,
                gender,
                branchId,
                role: role || 'RECEPTIONIST',
                specialization,
                licenseNumber,
                hireDate: new Date(hireDate),
                address,
                isActive: isActive !== undefined ? isActive : true,
            },
            include: {
                branch: { select: { id: true, name: true } },
            },
        });

        return NextResponse.json(staff, { status: 201 });
    } catch (error) {
        console.error('POST /api/employees error:', error);
        return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
    }
}
