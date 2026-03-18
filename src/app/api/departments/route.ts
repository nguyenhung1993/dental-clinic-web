import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET /api/departments - Trả về danh sách chi nhánh (để tương thích với UI cũ)
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
        }

        const branches = await prisma.branch.findMany({
            include: {
                _count: { select: { staff: true } },
            },
            orderBy: { name: 'asc' },
        });

        const data = branches.map(b => ({
            id: b.id,
            name: b.name,
            code: b.id.substring(0, 8).toUpperCase(), // Giả lập code
            employeeCount: b._count.staff,
            isActive: b.isActive,
            managerName: 'Admin', // Dummy data for now
        }));

        return NextResponse.json({ data });
    } catch (error) {
        console.error('GET /api/departments error:', error);
        return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
    }
}

// POST /api/departments - Tạo chi nhánh mới
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
        }

        const body = await request.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json(
                { error: 'Thiếu thông tin bắt buộc: name' },
                { status: 400 }
            );
        }

        const branch = await prisma.branch.create({
            data: { name, address: '', phone: '' },
        });

        return NextResponse.json(branch, { status: 201 });
    } catch (error) {
        console.error('POST /api/departments error:', error);
        return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
    }
}
