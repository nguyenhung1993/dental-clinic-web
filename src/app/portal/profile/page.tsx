'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function ProfilePage() {
    const { data: session } = useSession();
    const [staff, setStaff] = useState<any>(null);
    const [branch, setBranch] = useState<any>(null);

    useEffect(() => {
        // Fetch staff profile from API
        fetch('/api/employees?limit=50').then(r => r.json()).then((res: any) => {
            const staffList = res.data || [];
            const member = staffList.find((e: any) => e.email === session?.user?.email) || staffList[0];
            if (member) {
                setStaff(member);
                // Fetch branch info if needed or use from include
                if (member.branch) {
                    setBranch(member.branch);
                } else if (member.branchId) {
                    fetch(`/api/branches/${member.branchId}`).then(r => r.json()).then((res: any) => setBranch(res)).catch(() => {});
                }
            }
        }).catch(console.error);
    }, [session]);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        specialization: '',
    });

    useEffect(() => {
        if (staff) {
            setFormData({
                phone: staff.phone || '',
                address: staff.address || '',
                specialization: staff.specialization || '',
            });
        }
    }, [staff]);

    if (!staff) return <div className="p-6 text-center text-muted-foreground">Đang tải hồ sơ...</div>;

    const handleSave = () => {
        // Mock update
        toast.success("Đã cập nhật hồ sơ thành công!");
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Hồ sơ cá nhân</h1>
                <p className="text-muted-foreground">Xem và cập nhật thông tin của bạn</p>
            </div>

            <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                {/* Profile Card */}
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={session?.user?.image || undefined} />
                                <AvatarFallback>{staff.fullName.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle>{staff.fullName}</CardTitle>
                        <CardDescription>{staff.email}</CardDescription>
                        <div className="mt-2 text-sm font-medium text-primary">
                            {staff.role}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Mã nhân sự:</span>
                                <span className="font-medium">{staff.staffCode}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Chi nhánh:</span>
                                <span className="font-medium">{branch?.name || staff.branchName || 'Đang cập nhật'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Ngày vào làm:</span>
                                <span className="font-medium">{new Date(staff.hireDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">Trạng thái:</span>
                                <Badge variant={staff.isActive ? 'default' : 'secondary'}>
                                    {staff.isActive ? 'Đang hoạt động' : 'Tạm ngưng'}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Details Tabs */}
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid w-full grid-cols-1">
                        <TabsTrigger value="general">Thông tin chung</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general">
                        <Card>
                            <CardHeader>
                                <CardTitle>Thông tin liên hệ & Chuyên môn</CardTitle>
                                <CardDescription>Thông tin liên lạc và hồ sơ nghề nghiệp của bạn</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Số điện thoại</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="address">Địa chỉ</Label>
                                    <Input
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="specialization">Chuyên môn</Label>
                                    <Input
                                        id="specialization"
                                        value={formData.specialization}
                                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                        disabled={!isEditing}
                                        placeholder="Ví dụ: Chỉnh nha, Cấy ghép Implant..."
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                {isEditing ? (
                                    <>
                                        <Button variant="ghost" onClick={() => setIsEditing(false)}>Hủy</Button>
                                        <Button onClick={handleSave}>Lưu thay đổi</Button>
                                    </>
                                ) : (
                                    <Button variant="outline" onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
                                )}
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
