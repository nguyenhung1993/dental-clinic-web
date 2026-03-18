import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/employees/[id] - Get single staff member
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
        }

        const { id } = await params;

        const staff = await prisma.staff.findUnique({
            where: { id },
            include: {
                branch: { select: { id: true, name: true } },
            },
        });

        if (!staff) {
            return NextResponse.json({ error: 'Không tìm thấy nhân viên' }, { status: 404 });
        }

        return NextResponse.json(staff);
    } catch (error) {
        console.error('GET /api/employees/[id] error:', error);
        return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
    }
}

// PATCH /api/employees/[id] - Update staff member
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Check if staff exists
        const existing = await prisma.staff.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json({ error: 'Không tìm thấy nhân viên' }, { status: 404 });
        }

        const {
            fullName, email, phone, dob, gender,
            branchId, hireDate, address, role,
            specialization, licenseNumber, isActive, staffCode,
        } = body;

        // Check for duplicate email (excluding current staff)
        if (email && email !== existing.email) {
            const existingEmail = await prisma.staff.findUnique({
                where: { email },
            });
            if (existingEmail) {
                return NextResponse.json({ error: 'Email đã tồn tại' }, { status: 400 });
            }
        }

        // Check for duplicate staff code (excluding current staff)
        if (staffCode && staffCode !== existing.staffCode) {
            const existingCode = await prisma.staff.findUnique({
                where: { staffCode: staffCode },
            });
            if (existingCode) {
                return NextResponse.json({ error: 'Mã nhân viên đã tồn tại' }, { status: 400 });
            }
        }

        const staff = await prisma.staff.update({
            where: { id },
            data: {
                ...(fullName && { fullName }),
                ...(email && { email }),
                ...(phone !== undefined && { phone }),
                ...(dob && { dob: new Date(dob) }),
                ...(gender && { gender }),
                ...(branchId && { branchId }),
                ...(hireDate && { hireDate: new Date(hireDate) }),
                ...(address !== undefined && { address }),
                ...(role && { role }),
                ...(specialization !== undefined && { specialization }),
                ...(licenseNumber !== undefined && { licenseNumber }),
                ...(isActive !== undefined && { isActive }),
                ...(staffCode && { staffCode }),
            },
            include: {
                branch: { select: { id: true, name: true } },
            },
        });

        return NextResponse.json(staff);
    } catch (error) {
        console.error('PATCH /api/employees/[id] error:', error);
        return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
    }
}

// DELETE /api/employees/[id] - Delete staff member
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
        }

        const { id } = await params;

        const existing = await prisma.staff.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json({ error: 'Không tìm thấy nhân viên' }, { status: 404 });
        }

        await prisma.staff.delete({ where: { id } });

        return NextResponse.json({ message: 'Đã xóa nhân viên thành công' });
    } catch (error) {
        console.error('DELETE /api/employees/[id] error:', error);
        return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
    }
}
