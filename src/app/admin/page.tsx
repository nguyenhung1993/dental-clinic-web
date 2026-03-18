import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, ShieldCheck, Activity } from 'lucide-react';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getClinicStats() {
    const [
        totalPatients,
        totalAppointments,
        totalStaff,
        recentLogs
    ] = await Promise.all([
        prisma.patient.count(),
        prisma.appointment.count(),
        prisma.staff.count(),
        prisma.auditLog.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true } } }
        })
    ]);

    return {
        totalPatients,
        totalAppointments,
        totalStaff,
        recentLogs
    };
}

export default async function AdminDashboard() {
    const stats = await getClinicStats();

    const cards = [
        {
            title: 'Tổng bệnh nhân',
            value: stats.totalPatients,
            icon: Users,
            color: 'text-blue-600 bg-blue-100',
        },
        {
            title: 'Lịch hẹn',
            value: stats.totalAppointments,
            icon: Calendar,
            color: 'text-purple-600 bg-purple-100',
        },
        {
            title: 'Nhân viên',
            value: stats.totalStaff,
            icon: ShieldCheck,
            color: 'text-green-600 bg-green-100',
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Quản trị Hệ thống</h1>
                <p className="text-muted-foreground">Tổng quan hoạt động phòng khám nha khoa</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <Card key={i}>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${card.color}`}>
                                    <card.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                                    <p className="text-3xl font-bold">{card.value}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Hoạt động hệ thống gần đây
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.recentLogs.length === 0 ? (
                                <p className="text-center text-muted-foreground py-4">Chưa có hoạt động nào.</p>
                            ) : (
                                stats.recentLogs.map((log) => (
                                    <div key={log.id} className="flex items-center justify-between py-2 border-b last:border-0">
                                        <div>
                                            <p className="font-medium">{log.action}</p>
                                            <p className="text-sm text-muted-foreground">{log.entity} - {log.user?.name || 'Hệ thống'}</p>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(log.createdAt).toLocaleString('vi-VN')}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
