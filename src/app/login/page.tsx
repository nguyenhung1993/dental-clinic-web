'use client';

import { Suspense, useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Eye, EyeOff, X, HeartPulse, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <Suspense fallback={<LoginSkeleton />}>
            <LoginContent />
        </Suspense>
    );
}

function LoginSkeleton() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
        </div>
    );
}

function LoginContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email || !password) {
            toast.error('Vui lòng nhập đầy đủ thông tin');
            setIsLoading(false);
            return;
        }

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl,
            });

            if (result?.error) {
                toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
                setIsLoading(false);
            } else {
                toast.success('Đăng nhập thành công!');
                router.push(callbackUrl);
                router.refresh(); 
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Đã có lỗi xảy ra');
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        signIn('google', { callbackUrl });
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
            {/* Left Side: Branding & Illustration */}
            <div className="relative hidden md:flex md:w-1/2 lg:w-3/5 bg-gray-900 items-center justify-center p-12 overflow-hidden">
                {/* Background Pattern/Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/bg-dental.jpg" 
                        alt="Dental Background" 
                        className="w-full h-full object-cover opacity-30 grayscale blur-sm"
                        onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-gray-900/80" />
                </div>

                <div className="relative z-10 w-full max-w-lg space-y-12">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-red-500 rounded-3xl flex items-center justify-center shadow-lg shadow-red-500/20 ring-4 ring-white/10">
                            <HeartPulse className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-tight">DoctorCare</h1>
                            <p className="text-red-400 font-bold tracking-[0.2em] uppercase text-sm">Hệ thống Quản trị Nha khoa</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-5xl font-black text-white leading-[1.1]">
                            Quản lý chuyên nghiệp, <br />
                            <span className="text-red-500 italic">Vận hành tối ưu.</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed">
                            Giải pháp toàn diện cho quy trình điều trị, quản lý bệnh nhân và bứt phá doanh thu phòng khám của bạn.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                            <ShieldCheck className="w-6 h-6 text-red-500" />
                            <span className="text-white font-bold text-sm">Bảo mật chuẩn y khoa</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                            <Clock className="w-6 h-6 text-red-500" />
                            <span className="text-white font-bold text-sm">Tự động hóa 24/7</span>
                        </div>
                    </div>
                </div>
                
                {/* Decorative element */}
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-600/10 rounded-full blur-[100px]" />
            </div>

            {/* Right Side: Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gray-50/50 relative">
                {/* Mobile Identity */}
                <div className="absolute top-8 left-8 flex items-center gap-2 md:hidden">
                    <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center">
                        <HeartPulse className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-black text-gray-900 tracking-tight">DoctorCare</span>
                </div>

                <div className="w-full max-w-[420px] space-y-10 bg-white p-10 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100">
                    <div className="space-y-2">
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">Đăng nhập</h3>
                        <p className="text-gray-400 font-bold text-sm">Chào mừng bạn quay trở lại với hệ thống!</p>
                    </div>

                    <form onSubmit={handleCredentialsLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Địa chỉ Email</Label>
                            <div className="relative group">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="doctor@care.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    className="bg-gray-50 border-none h-14 px-6 rounded-2xl font-bold text-gray-900 hover:bg-gray-100 transition-all focus:ring-2 focus:ring-red-500/20"
                                />
                                {email && (
                                    <button
                                        type="button"
                                        onClick={() => setEmail('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-1">
                                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mật khẩu</Label>
                                <Link href="/forgot-password" virtual-link="true" className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    className="bg-gray-50 border-none h-14 px-6 rounded-2xl font-bold text-gray-900 hover:bg-gray-100 transition-all focus:ring-2 focus:ring-red-500/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-14 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black text-lg shadow-lg shadow-red-500/30 transition-all active:scale-[0.98]" 
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                "Tiếp tục"
                            )}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-100" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 px-4">
                            Hoặc đăng nhập bằng
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full h-14 rounded-2xl border-gray-100 hover:bg-gray-50 font-bold transition-all"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                    >
                        <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Google Account
                    </Button>

                    <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">
                            Chưa có quyền truy cập? {' '}
                            <Link href="/contact" className="text-red-500 hover:underline">Liên hệ kỹ thuật</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Float Elements for aesthetics */}
            <div className="fixed top-[-5%] left-[-5%] w-[30vw] h-[30vw] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />
        </div>
    );
}
