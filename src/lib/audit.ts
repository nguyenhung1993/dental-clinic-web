import { auth } from "./auth";
import prisma from "./prisma";

export type AuditLogInput = {
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | string;
    entity: string;
    entityId: string;
    oldData?: any;
    newData?: any;
};

/**
 * Ghi lại nhật ký hệ thống
 */
export async function createAuditLog(data: AuditLogInput) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            console.warn('AuditLog: Không tìm thấy userId trong session. Bỏ qua ghi log.');
            return;
        }

        await prisma.auditLog.create({
            data: {
                userId: session.user.id,
                action: data.action,
                entity: data.entity,
                entityId: data.entityId,
                oldData: data.oldData ? JSON.parse(JSON.stringify(data.oldData)) : undefined,
                newData: data.newData ? JSON.parse(JSON.stringify(data.newData)) : undefined,
            }
        });
    } catch (error) {
        console.error('AuditLog Error:', error);
    }
}
