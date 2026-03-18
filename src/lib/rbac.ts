// Role-Based Access Control (RBAC) Configuration cho Phòng khám Nha khoa

// ========== ROLES (Must match Prisma StaffRole exactly + VIEWER) ==========
export type Role =
    | 'SUPER_ADMIN'
    | 'ADMIN'
    | 'DOCTOR'
    | 'ASSISTANT'
    | 'RECEPTIONIST'
    | 'ACCOUNTANT'
    | 'VIEWER';

// ========== PERMISSIONS ==========
export type Permission =
    | 'dashboard:view'
    | 'appointments:view' | 'appointments:manage'
    | 'patients:view' | 'patients:manage'
    | 'billing:view' | 'billing:manage'
    | 'users:view' | 'users:manage'
    | 'settings:view' | 'settings:manage';

// ========== ROLE -> PERMISSIONS MAPPING ==========
export const rolePermissions: Record<Role, Permission[]> = {
    SUPER_ADMIN: [
        'dashboard:view',
        'appointments:view', 'appointments:manage',
        'patients:view', 'patients:manage',
        'billing:view', 'billing:manage',
        'users:view', 'users:manage',
        'settings:view', 'settings:manage',
    ],
    ADMIN: [
        'dashboard:view',
        'appointments:view', 'appointments:manage',
        'patients:view', 'patients:manage',
        'billing:view', 'billing:manage',
        'users:view', 'users:manage',
        'settings:view', 'settings:manage',
    ],
    DOCTOR: [
        'dashboard:view',
        'appointments:view', 'appointments:manage',
        'patients:view', 'patients:manage',
        'billing:view',
    ],
    ASSISTANT: [
        'dashboard:view',
        'appointments:view',
        'patients:view',
    ],
    RECEPTIONIST: [
        'dashboard:view',
        'appointments:view', 'appointments:manage',
        'patients:view', 'patients:manage',
        'billing:view',
        'users:view',
    ],
    ACCOUNTANT: [
        'dashboard:view',
        'appointments:view',
        'patients:view',
        'billing:view', 'billing:manage',
    ],
    VIEWER: [
        'dashboard:view',
    ],
};

// ========== ROLE LABELS ==========
export const roleLabels: Record<Role, { label: string; description: string; color: string }> = {
    SUPER_ADMIN: { label: 'Quản trị viên cấp cao', description: 'Toàn quyền hệ thống', color: 'bg-red-100 text-red-800' },
    ADMIN: { label: 'Quản trị viên', description: 'Quản lý phòng khám', color: 'bg-purple-100 text-purple-800' },
    DOCTOR: { label: 'Bác sĩ', description: 'Bác sĩ điều trị', color: 'bg-blue-100 text-blue-800' },
    ASSISTANT: { label: 'Phụ tá', description: 'Bác sĩ phụ tá', color: 'bg-green-100 text-green-800' },
    RECEPTIONIST: { label: 'Lễ tân', description: 'Tiếp đón viên', color: 'bg-orange-100 text-orange-800' },
    ACCOUNTANT: { label: 'Kế toán', description: 'Kế toán trưởng', color: 'bg-gray-100 text-gray-800' },
    VIEWER: { label: 'Viewer', description: 'Chỉ xem', color: 'bg-slate-100 text-slate-800' },
};

// ========== HELPER FUNCTIONS ==========
export const hasPermission = (role: Role, permission: Permission): boolean => {
    return rolePermissions[role]?.includes(permission) ?? false;
};

export const hasAnyPermission = (role: Role, permissions: Permission[]): boolean => {
    return permissions.some(p => hasPermission(role, p));
};

export const hasAllPermissions = (role: Role, permissions: Permission[]): boolean => {
    return permissions.every(p => hasPermission(role, p));
};

// ========== NAVIGATION CONFIG WITH PERMISSIONS ==========
export interface NavItem {
    href: string;
    label: string;
    icon: string; // lucide icon name
    permission: Permission;
    children?: NavItem[];
    matchExact?: boolean;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export const navigationConfig: NavGroup[] = [
    {
        title: 'Hệ thống',
        items: [
            { href: '/admin', label: 'Dashboard', icon: 'LayoutDashboard', permission: 'dashboard:view' },
            { href: '/admin/audit-logs', label: 'Hoạt động', icon: 'Shield', permission: 'dashboard:view' },
            { href: '/admin/users', label: 'Tài khoản', icon: 'Users', permission: 'dashboard:view' },
        ],
    },
];

export const getNavigationForRole = (role: Role): NavGroup[] => {
    return navigationConfig
        .map(group => ({
            ...group,
            items: group.items.filter(item => hasPermission(role, item.permission)),
        }))
        .filter(group => group.items.length > 0);
};
