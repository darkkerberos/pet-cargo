import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableHeader, TableRow
} from "@/components/ui/table2";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import {
    Loader2, Eye, Pencil, Trash2, Search,
    MapPin, PawPrint, User, Phone, Package, Calendar, FileText,
    Box, Weight, Package2, Clock, PackageCheck, PackageCheckIcon,
    Package2Icon, Truck, ChevronLeft, ChevronLeftCircle, Download,
    ChevronDown, ChevronUp, Settings

} from 'lucide-react';

export interface BookOrder {
    id: number;
    owner_name: string;
    owner_gender: string;
    owner_email: string;
    owner_phone: string;
    owner_address: string;
    services_type: string;
    transport_mode: string;
    handling_method: string;
    recipient_name: string;
    recipient_gender: string;
    recipient_email: string;
    recipient_phone: string;
    recipient_address: string;
    pet_name: string;
    pet_gender: string;
    pet_color: string;
    pet_weight: number;
    pet_microchip: string;
    pet_species: string;
    pet_dob: string;
    crate_dimension: string;
    origin_city_or_airport: string;
    destination_city_or_airport: string;
    created_at: string;
}

const BookOrder = () => {
    const [orders, setOrders] = useState<BookOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<BookOrder | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7654';
    const token = localStorage.getItem('authToken');

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalRow, setTotalRow] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID");
    };
    const totalPages = Math.ceil(totalRow / perPage);
    const { locale, timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const formatDateExplicit = (dateString?: string) => {
    if (!dateString) return "-"; // Atau return string kosong
    
    const date = new Date(dateString);
        if (isNaN(date.getTime())) return "-"; // Cek jika format string ngaco

        return new Intl.DateTimeFormat(locale, {
            timeZone,
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date);
    };


    useEffect(() => {
        fetchOrders();
    }, [page, perPage, searchTerm]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                keyword: searchTerm,
                page: String(page),
                item_per_page: String(perPage),
            });

            const response = await fetch(
                `${apiBaseUrl}/api/book-order/search?${params.toString()}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const resData = await response.json();

            setOrders(resData.data || []);
            setTotalRow(resData.total_row || 0);
        } catch (err) {
            toast.error("Gagal mengambil data pesanan");
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetail = async (id: number, editMode = false) => {
        try {
            const response = await fetch(`${apiBaseUrl}/api/book-order/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setSelectedOrder(data);
            setIsEditing(editMode);
            setIsDetailOpen(true);
        } catch (err) {
            toast.error("Gagal mengambil detail pesanan");
        }
    };

    const handleUpdate = async () => {
        if (!selectedOrder) return;
        try {
            const response = await fetch(`${apiBaseUrl}/api/book-order/${selectedOrder.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(selectedOrder),
            });
            if (!response.ok) throw new Error();
            toast.success("Pesanan berhasil diupdate");
            setIsDetailOpen(false);
            fetchOrders();
        } catch (err) {
            toast.error("Gagal mengupdate data");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus pesanan ini?")) return;
        try {
            const response = await fetch(`${apiBaseUrl}/api/book-order/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error();
            toast.success("Pesanan berhasil dihapus");
            setOrders(orders.filter(o => o.id !== id));
        } catch (err) {
            toast.error("Gagal menghapus data");
        }
    };

    const filteredOrders = orders.filter(o =>
        o.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.pet_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col gap-2">
                <h2 className="text-sm font-bold text-[#00365c] uppercase tracking-[0.2em] opacity-60">Inquiry Management</h2>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Book Orders</h1>
            </div>
            <div className="space-y-6 text-card-foreground flex flex-col gap-6 border py-6 rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white">
                <div className='border-t border-gray-100 p-5 sm:p-6 dark:border-gray-800 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]' >
                    <div className="overflow-hidden ">
                        <div className="mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 dark:text-gray-400"> Show </span>
                                <div className="relative z-20 bg-white">
                                    <select
                                        value={perPage}
                                        onFocus={() => setIsSelectOpen(true)}
                                        onChange={(e) => {
                                            setPerPage(Number(e.target.value));
                                            setPage(1); // reset ke page 1
                                        }}
                                        onBlur={() => setIsSelectOpen(false)}
                                        className="cursor-pointer h-10 px-3 dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 
                                                    dark:focus:border-brand-800 h-9 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none 
                                                    py-2 pr-8 pl-3 text-sm text-gray-800 placeholder:text-gray-800 focus:ring-3 focus:outline-hidden
                                                    dark:border-gray-400 dark:text-gray-800/90 dark:placeholder:text-gray-800/30"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                    </select>
                                    <span className="pointer-events-none absolute top-1/2 right-2 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                        {isSelectOpen ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
                                    </span>
                                </div>
                                <span className="text-gray-500 dark:text-gray-400"> entries </span>
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

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="relative">
                                    <button className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                        <Search size={20} />
                                    </button>
                                    <Input
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        type="text" placeholder="Search..."
                                        className="pl-10 rounded-xl border-none bg-white shadow-sm h-11 dark:bg-dark-900 focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 border-gray-300 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[300px] dark:border-gray-700  dark:text-gray-800/90 dark:placeholder:text-gray/600/30" />
                                </div>

                                {/* <button className="shadow-theme-xs flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-[11px] text-sm font-medium text-gray-700 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                    Download

                                    <Download size={20} />
                                </button> */}
                            </div>
                        </div>
                        <div className="max-w-full overflow-x-auto">
                            <Table className='table-fixed'>
                                {/* Table Header */}
                                <TableHeader className="border-3 border-collapse shadow border-gray-100 dark:border-white/[0.05]">
                                    <TableRow>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            No
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                        >
                                            Owner
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                        >
                                            Pet Details
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                        >
                                            Route
                                            <div className="absolute right-0 top-1/2 h-6 w-px -translate-y-1/2 bg-slate-200" />
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                        >
                                            Cargo Specs
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                        >
                                            Services
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                        >
                                            Order Date
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                        >
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>

                                {/* Table Body */}
                                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {filteredOrders.map((order, index) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="px-5 py-4 sm:px-6 text-start">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 overflow-hidden font-medium text-gray-500">
                                                        {(page - 1) * perPage + index + 1}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                                                        <User size={15} className="text-[#00365c]" />
                                                        <span className="font-semibold text-slate-900">{order.owner_name}</span>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-400">
                                                        <Phone size={12} />
                                                        <span className="text-xs text-slate-400">{order.owner_phone}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">


                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <div className="flex -space-x-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 bg-[#00365c]/5 rounded-lg text-[#00365c]">
                                                            <PawPrint size={14} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-sm">{order.pet_name}</span>
                                                            <span className="text-[10px] uppercase font-bold text-slate-400">{order.pet_species}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                    <span className="bg-slate-100 px-2 py-1 rounded-md">{order.origin_city_or_airport}</span>
                                                    <ChevronRight size={12} className="text-slate-300" />
                                                    <span className="bg-[#00365c]/10 text-[#00365c] px-2 py-1 rounded-md font-semibold">{order.destination_city_or_airport}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                                                        <Package size={15} className="text-[#00365c]" />
                                                        <span>{order.crate_dimension}</span>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-400">
                                                        <Weight size={15} />
                                                        <span>{order.pet_weight} kg</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500  text-theme-sm dark:text-gray-400">
                                                <div className="flex flex-col gap-1 ">
                                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                                                        <PackageCheck size={15} className="text-[#00365c]" />
                                                        <span>{order.services_type}</span>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase text-slate-400">
                                                        <Truck size={15} />
                                                        <span>{order.handling_method}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                                                        <Clock size={15} className="text-[#00365c]" />
                                                        <span>{formatDateExplicit(order.created_at)}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right ">
                                                <div className="col-span-1 flex items-center px-4 py-3">
                                                    <div className="flex w-full items-center gap-1 justify-between">
                                                        <Button size="icon" variant="ghost" className="text-gray-500 rounded-md hover:bg-blue-50 hover:text-blue-600" onClick={() => handleViewDetail(order.id)}>
                                                            <Eye size={18} />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="text-gray-500 rounded-md hover:bg-amber-50 hover:text-amber-600" onClick={() => handleViewDetail(order.id, true)}>
                                                            <Pencil size={18} />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="text-gray-500 rounded-md hover:bg-rose-50 hover:text-rose-600" onClick={() => handleDelete(order.id)}>
                                                            <Trash2 size={18} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div></div>
                {totalPages >= 0 && (
                    <div className="mt-5 flex items-center justify-center gap-4">
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
                            <span className="text-sm text-slate-400">of {totalPages || 1}</span>
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
                )}


                {/* Modal Detail & Edit */}
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-0 border-none shadow-2xl custom-scrollbar">
                        <DialogHeader className="p-8 bg-[#00365c] text-white">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <DialogTitle className="text-2xl font-medium tracking-tight">
                                        {isEditing ? 'Edit Book Order' : 'Order Specification'}
                                    </DialogTitle>
                                    <p className="text-white/60 text-xs uppercase tracking-widest font-medium mt-1">Order ID: #{selectedOrder?.id}</p>
                                    <p className="text-white/60 text-xs uppercase tracking-widest font-medium mt-1">Order Date: {formatDateExplicit( selectedOrder?.created_at)}</p>
                                </div>
                            </div>
                        </DialogHeader>

                        {selectedOrder && (
                            <div className="p-8 space-y-10">
                                {/* Section 1: Parties */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-[#00365c] mb-2 font-black text-xs uppercase tracking-widest">
                                            <User size={14} /> Pengirim (Owner)
                                        </div>
                                        <div className="grid grid-cols-2 gap-5 space-y-3 p-4 bg-slate-50 rounded-2xl">
                                            <DetailField isRequired={true} label="Nama" s value={selectedOrder.owner_name} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, owner_name: v })} />
                                            <DetailField isRequired={true} label="Phone" value={selectedOrder.owner_phone} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, owner_phone: v })} />
                                            <DetailField isRequired={true} label="Alamat" value={selectedOrder.owner_address} isEdit={isEditing} isArea onChange={(v) => setSelectedOrder({ ...selectedOrder, owner_address: v })} />
                                            <DetailField isRequired={true} label="Email" value={selectedOrder.owner_email} isEdit={isEditing} isArea onChange={(v) => setSelectedOrder({ ...selectedOrder, owner_email: v })} />
                                            <DetailField 
                                                label="Gender" 
                                                value={selectedOrder.owner_gender} 
                                                isEdit={isEditing} 
                                                isRequired={true}
                                                type="select"
                                                options={[
                                                    { label: '-', value: '-' },
                                                    { label: 'Laki-laki', value: 'Laki-laki' },
                                                    { label: 'Perempuan', value: 'Perempuan' },
                                                ]}
                                                onChange={(v) => setSelectedOrder({ ...selectedOrder, owner_gender: v })} 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-emerald-600 mb-2 font-black text-xs uppercase tracking-widest">
                                            <MapPin size={14} /> Penerima (Recipient)
                                        </div>
                                        <div className="grid grid-cols-2 gap-5 space-y-3 p-4 bg-emerald-50/90 rounded-2xl">
                                            <DetailField isRequired={true} label="Nama" value={selectedOrder.recipient_name} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, recipient_name: v })} />
                                            <DetailField isRequired={true} label="Phone" value={selectedOrder.recipient_phone} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, recipient_phone: v })} />
                                            <DetailField isRequired={true} label="Alamat" value={selectedOrder.recipient_address} isEdit={isEditing} isArea onChange={(v) => setSelectedOrder({ ...selectedOrder, recipient_address: v })} />
                                            <DetailField isRequired={true} label="Email" value={selectedOrder.recipient_email} isEdit={isEditing} isArea onChange={(v) => setSelectedOrder({ ...selectedOrder, recipient_email: v })} />
                                            <DetailField 
                                                label="Gender" 
                                                value={selectedOrder.recipient_gender} 
                                                isEdit={isEditing} 
                                                isRequired={true}
                                                type="select"
                                                options={[
                                                    { label: '-', value: '-' },
                                                    { label: 'Laki-laki', value: 'Laki-laki' },
                                                    { label: 'Perempuan', value: 'Perempuan' },
                                                ]}
                                                onChange={(v) => setSelectedOrder({ ...selectedOrder, recipient_gender: v })} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section BARU: Service Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-indigo-600 mb-2 font-black text-xs uppercase tracking-widest">
                                        <Settings size={14} /> Detail Layanan & Handling
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 bg-blue-400/90 border-2 border-indigo-50 rounded-[2rem]">
                                        <DetailField 
                                            label="Service Type" 
                                            value={selectedOrder.services_type} 
                                            isEdit={isEditing} 
                                            isRequired={true}
                                            type="select"
                                            options={[
                                                { label: 'Cargo Domestic', value: 'cargo domestic' },
                                                { label: 'Cargo International', value: 'cargo international' },
                                                { label: 'Customs Clearance', value: 'customs clearance' }
                                            ]}
                                            onChange={(v) => setSelectedOrder({ ...selectedOrder, services_type: v })} 
                                        />
                                        <DetailField 
                                            label="Handling Method" 
                                            value={selectedOrder.handling_method} 
                                            isEdit={isEditing} 
                                            isRequired={true}
                                            type="select"
                                            options={[
                                                { label: 'Pickup', value: 'pickup' },
                                                { label: 'Drop Off', value: 'dropoff' },
                                                { label: 'Pickup and Drop Off', value: 'pickup and dropoff' }
                                            ]}
                                            onChange={(v) => setSelectedOrder({ ...selectedOrder, handling_method: v })} 
                                        />
                                        <DetailField 
                                            label="Transport Mode" 
                                            value="Airplane" 
                                            isEdit={isEditing} 
                                            isReadOnly={true}
                                            isRequired={true}
                                        />
                                        <DetailField isRequired={true} label="Origin" value={selectedOrder.origin_city_or_airport} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, origin_city_or_airport: v })} />
                                        <DetailField isRequired={true} label="Destinasi" value={selectedOrder.destination_city_or_airport} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, destination_city_or_airport: v })} />
                                    </div>
                                </div>

                                {/* Section 2: Pet Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-amber-600 mb-2 font-black text-xs uppercase tracking-widest">
                                        <PawPrint size={14} /> Informasi Hewan & Kargo
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-7 bg-amber-700/40 gap-4 p-6 border-2 border-slate-50 rounded-[2rem]">
                                        <DetailField label="Nama Pet" value={selectedOrder.pet_name} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, pet_name: v })} />
                                        <DetailField label="Spesies" value={selectedOrder.pet_species} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, pet_species: v })} />
                                        <DetailField label="Warna" value={selectedOrder.pet_color} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, pet_color: v })} />
                                        <DetailField label="Berat (kg)" value={selectedOrder.pet_weight} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, pet_weight: v })} />
                                        <DetailField label="Gender" value={selectedOrder.pet_gender} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, pet_gender: v })} />
                                        <DetailField label="Crate Dim" value={selectedOrder.crate_dimension} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, crate_dimension: v })} />
                                        <DetailField label="Microchip" value={selectedOrder.pet_microchip} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, pet_microchip: v })} />
                                        
                                    </div>
                                </div>
                            </div>
                        )}

                        <DialogFooter className="p-8 bg-slate-50">
                            <Button variant="ghost" onClick={() => setIsDetailOpen(false)} className="bg-red-200 rounded-xl font-bold">Close</Button>
                            {isEditing && (
                                <Button onClick={handleUpdate} className="bg-[#00365c] rounded-xl px-8 font-bold">Update Data</Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

// Reusable Small Component for Detail Row
const DetailField = ({ isRequired = false, label, value, isEdit, onChange, isArea = false }: any) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-800">{label}
            {isRequired ? (<span style={{ color: 'red' }}>*</span>) : ""}
        </label>
        {isEdit ? (
            isArea ? (
                <textarea required={isRequired} className="text-sm p-2 rounded-lg bg-white border border-slate-200 outline-[#00365c]" rows={2} value={value} onChange={(e) => onChange(e.target.value)} />
            ) : (
                <input required={isRequired} className="text-sm p-2 rounded-lg bg-white border border-slate-200 outline-[#00365c]" value={value} onChange={(e) => onChange(e.target.value)} />
            )
        ) : (
            <p className="text-sm font-bold text-slate-700">{value || '-'}</p>
        )}
    </div>
);

const ChevronRight = ({ size, className }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6" /></svg>
);

export default BookOrder;