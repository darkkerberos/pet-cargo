import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    User, Mail, Shield, Eye, Pencil,
    ChevronLeft, ChevronRight, Search,
    Plus, Lock, Loader2,
    FileText,
    User2,
    EyeOff
} from 'lucide-react';
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import Swal from 'sweetalert2';
import { toast } from 'sonner'

// --- Interfaces ---
interface UserData {
    id: number;
    role_id: number;
    username: string;
    email: string;
    full_name: string;
    role_name?: string;
}

interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

interface SearchResponse {
    page: number;
    item_per_page: number;
    total_row: number;
    data: UserData[];
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:7654";

const Users = () => {
    // --- States ---
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [keyword, setKeyword] = useState("");
    const [totalRow, setTotalRow] = useState(0);

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('view');
    const [formData, setFormData] = useState({
        id: 0,
        username: '',
        email: '',
        full_name: '',
        password: '',
        new_password: ''
    });

    const axiosConfig = {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    };

    // --- API Calls ---
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/api/user/search`, {
                ...axiosConfig,
                params: { page, item_per_page: perPage, keyword }
            });
            const { data = [], total_row = 0 } = res.data || {};
            setUsers(Array.isArray(data) ? data : []);
            setTotalRow(total_row);
        } catch (err) {
            toast.error("gagal mengambil data")
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, [page, perPage, keyword]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // --- Logic Helpers ---
    const totalPages = Math.ceil(totalRow / perPage);

    const validateInput = (val: string) => val.toLowerCase().replace(/\s/g, '');

    const handleOpenModal = (mode: 'create' | 'edit' | 'view', user?: UserData) => {
        setModalMode(mode);
        if (user) {
            setFormData({ ...formData, id: user.id, username: user.username, email: user.email, full_name: user.full_name, password: '' });
        } else {
            setFormData({ id: 0, username: '', email: '', full_name: '', password: '', new_password: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        // Simple Validation
        if (modalMode === 'create' && formData.password.length < 8) {
            return Swal.fire('Error', 'Password minimal 8 karakter', 'error');
        }

        try {
            const payload = {
                ...formData,
                role_id: 1,
                username: validateInput(formData.username),
                email: validateInput(formData.email)
            };

            if (modalMode === 'create') {
                await axios.post(`${API_BASE}/api/register`, payload);
                Swal.fire('Success', 'User Registered', 'success');
            } else {
                await axios.put(`${API_BASE}/api/user`, payload, axiosConfig);
                Swal.fire('Updated', 'User info updated', 'success');
            }
            setIsModalOpen(false);
            fetchUsers();
        } catch (err: any) {
            Swal.fire('Error', err.response?.data?.message || 'Operation failed', 'error');
        }
    };

    const handleResetPassword = async () => {
        if (!formData.new_password) return;
        try {
            await axios.post(`${API_BASE}/api/user/reset-password`, {
                id: formData.id,
                username: formData.username,
                email: formData.email,
                new_password: formData.new_password
            }, axiosConfig);
            Swal.fire('Success', 'Password has been reset', 'success');
            setFormData({ ...formData, new_password: '' });
        } catch (err) {
            Swal.fire('Error', 'Reset failed', 'error');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-sm font-semibold text-[#00365c] uppercase tracking-[0.2em] opacity-60">Manage and monitor your administrator database.</h1>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Users Management</h2>
            </div>
            <div className="flex justify-end items-end">
                <Button onClick={() => handleOpenModal('create')} className="bg-[#00365c] hover:bg-[#002a47] cursor-pointer sm:max-w-full rounded-2xl px-6 h-12 font-bold shadow-lg flex gap-2">
                    <Plus size={20} /> Add User
                </Button>
            </div>

            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white">
                {/* Table Toolbar */}
                <div className="p-6 border-b flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-sm font-medium text-gray-500 uppercase text-slate-400 tracking-widest">Show</span>
                        <select
                            value={perPage}
                            onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                            className="cursor-pointer text-sm font-medium text-gray-500 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold outline-[#00365c]"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="cursor-pointer rounded-full w-12 h-12 border-slate-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[oklch(0.62_0.15_265.19)]">Page {page}</span>
                            <span className="text-sm text-slate-400">of <b>{totalPages || 1}</b></span>
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            className="cursor-pointer rounded-full w-12 h-12 border-slate-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30"
                            onClick={() => setPage(p => p + 1)}
                            disabled={page >= totalPages}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </div>

                    <div className="relative">
                        <Search className="font-medium text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 " size={18} />
                        <input
                            type="text"
                            placeholder="Search by username or name..."
                            className="font-medium text-gray-500 pl-12 pr-6 py-3 rounded-2xl border border-slate-200 w-full md:w-80 outline-[#00365c]"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                </div>

                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className=" shadow bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-[0.2em]">
                                <tr>
                                    <th className=" px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Full Name & Username</th>
                                    <th className=" px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Email Address</th>
                                    {/* <th className=" px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Role</th> */}
                                    <th className=" px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="py-20 text-center">
                                            <Loader2 className="mx-auto animate-spin text-[#00365c]" size={40} />
                                        </td>
                                    </tr>
                                ) : users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/80 transition-all group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-[#00365c]/10 flex items-center justify-center text-[#00365c] font-black">
                                                    {user.full_name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">{user.full_name}</p>
                                                    <p className="text-xs text-slate-400 font-medium">@{user.username}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 font-medium text-slate-600 text-sm font-medium text-gray-500">{user.email}</td>
                                        {/* <td className="px-8 py-5">
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-full tracking-wider">
                                                Administrator
                                            </span>
                                        </td> */}
                                        <td className="px-8 py-5 text-center space-x-2 justify-between items-center">
                                            <Button variant="ghost" onClick={() => handleOpenModal('view', user)} className="rounded-xl hover:bg-white hover:shadow-md"><Eye size={18} /></Button>
                                            <Button variant="ghost" onClick={() => handleOpenModal('edit', user)} className="rounded-xl hover:bg-white hover:shadow-md text-blue-600"><Pencil size={18} /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Modal Dialog */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-0 border-none shadow-2xl custom-scrollbar">
                    <DialogHeader className="p-8 bg-[#00365c] text-white">
                        <DialogTitle className="text-2xl">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                                    <User2 size={24} />
                                </div>
                                <div>
                                    <DialogTitle className="text-2xl font-medium tracking-tight">
                                        {modalMode === 'create' ? 'Create Administrator' : modalMode === 'edit' ? 'Update User' : 'User Information'}
                                    </DialogTitle>
                                    <p className="text-white/60 text-xs uppercase tracking-widest font-medium mt-1">ID: #{formData?.id}</p>

                                </div>
                            </div>
                            
                        </DialogTitle>
                    </DialogHeader>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Full Name"
                                value={formData.full_name}
                                disabled={modalMode === 'view'}
                                onChange={(v) => setFormData({ ...formData, full_name: v })}
                            />
                            <InputField
                                label="Username"
                                value={formData.username}
                                disabled={modalMode === 'view'}
                                onChange={(v) => setFormData({ ...formData, username: validateInput(v) })}
                            />
                        </div>
                        <InputField
                            label="Email"
                            value={formData.email}
                            disabled={modalMode === 'view'}
                            onChange={(v) => setFormData({ ...formData, email: validateInput(v) })}
                        />

                        {modalMode === 'create' && (
                            <InputField
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={(v) => setFormData({ ...formData, password: v })}
                            />
                            
                        )}

                        {modalMode === 'edit' && (
                            <div className="mt-8 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest flex items-center gap-2">
                                    <Lock size={12} /> Reset Password
                                </p>
                                <div className="flex gap-2 relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        className="appearance-none bg-[#fdfeff94] w-full p-3 rounded-xl border px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-medium"
                                        value={formData.new_password}
                                        onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="cursor-pointer absolute right-21 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                    <Button onClick={handleResetPassword} disabled={!formData.new_password} className="bg-amber-500 hover:bg-amber-600 rounded-xl font-medium text-gray-100">Reset</Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="p-8 bg-slate-50">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-xl font-bold">Close</Button>
                        {modalMode !== 'view' && (
                            <Button onClick={handleSubmit} className="bg-[#00365c] rounded-xl px-8 font-bold">
                                {modalMode === 'create' ? 'Register User' : 'Save Changes'}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// Helper Input Component
const InputField = ({ label, value, onChange, type = "text", disabled = false }: any) => (
    <div className="space-y-1">
        <label className="text-[14px] font-semibold tracking-wide text-slate-400 tracking-widest px-1">{label}</label>
        <input
            type={type}
            disabled={disabled}
            className="w-full bg-[#fdfeff94] font-medium p-3 rounded-2xl border border-slate-200 outline-[#00365c] text-slate-700 disabled:bg-slate-50 disabled:text-slate-400 transition-all"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export default Users;