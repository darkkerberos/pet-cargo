import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
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
    Box, Weight
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface BookOrderData {
    id: number;
    owner_name: string;
    pet_name: string;
    pet_species: string;
    origin_city_or_airport: string;
    destination_city_or_airport: string;
    crate_dimension: string;
    pet_weight: number;
    [key: string]: any; // Untuk field lainnya
}

const BookOrder = () => {
    const [orders, setOrders] = useState<BookOrderData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<BookOrderData | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7654';
    const token = localStorage.getItem('authToken');

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);


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
            setTotalPages(resData.meta?.total_pages || 1); // asumsi backend kirim meta
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
        <div className="p-4 pb-20 mx-auto max-w-(--breakpoint-2xl) md:p-6 md:pb-24">
            <div className="space-y-6">
                {/* Header & Search */}
                <div className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    <div>
                        <h2 className="text-sm font-bold text-[#00365c] uppercase tracking-[0.2em] mb-1 text-muted-foreground">Inquiry Management</h2>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Book Orders</h1>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <Input
                            placeholder="Cari ..."
                            className="pl-10 rounded-xl border-none bg-white shadow-sm h-11 focus-visible:ring-1 focus-visible:ring-[#00365c]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Label className="text-xs font-bold text-slate-500">Show</Label>
                        <select
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(Number(e.target.value));
                                setPage(1); // reset ke page 1
                            }}
                            className="h-10 px-3 rounded-xl bg-white border border-slate-200 text-sm font-bold"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                        <Label className="text-xs font-bold text-slate-500">Entries</Label>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    {loading ? (
                        <div className="p-20 flex flex-col items-center gap-4 text-slate-400">
                            <Loader2 className="animate-spin" size={40} />
                            <p className="font-medium">Mengambil data...</p>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="p-20 text-center flex flex-col items-center gap-3">
                            <div className="bg-slate-50 p-6 rounded-full text-slate-300">
                                <Package size={48} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No Book Orders</h3>
                            <p className="text-slate-400 text-sm max-w-[250px]">Belum ada data pesanan masuk dari formulir layanan.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="bg-[color-mix(in_oklab,oklch(0.52_0.21_257.77)_50%,transparent)]">
                                <TableRow className="border-none">
                                    <TableHead className="font-bold text-[#00365c] py-5 pl-8">Owner</TableHead>
                                    <TableHead className="font-bold text-[#00365c]">Pet Details</TableHead>
                                    <TableHead className="font-bold text-[#00365c]">Route</TableHead>
                                    <TableHead className="font-bold text-[#00365c]">Cargo Specs</TableHead>
                                    <TableHead className="font-bold text-[#00365c] py-5 pl-8">Recipient</TableHead>
                                    <TableHead className="text-right pr-8 font-bold text-[#00365c]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.map((order) => (
                                    <TableRow key={order.id} className="hover:bg-slate-50/50 transition-colors border-slate-50">
                                        <TableCell className="py-4 pl-8">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900">{order.owner_name}</span>
                                                <span className="text-xs text-slate-400">{order.owner_phone}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-[#00365c]/5 rounded-lg text-[#00365c]">
                                                    <PawPrint size={14} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">{order.pet_name}</span>
                                                    <span className="text-[10px] uppercase font-bold text-slate-400">{order.pet_species}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                <span className="bg-slate-100 px-2 py-1 rounded-md">{order.origin_city_or_airport}</span>
                                                <ChevronRight size={12} className="text-slate-300" />
                                                <span className="bg-[#00365c]/10 text-[#00365c] px-2 py-1 rounded-md font-bold">{order.destination_city_or_airport}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                                                    <Box size={15} className="text-[#00365c]" />
                                                    <span>{order.crate_dimension}</span>
                                                </div>

                                                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-400">
                                                    <Weight size={15} />
                                                    <span>{order.pet_weight} kg</span>
                                                </div>
                                            </div>

                                        </TableCell>
                                        <TableCell className="py-4 pl-8">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900">{order.recipient_name}</span>
                                                <span className="text-xs text-slate-400">{order.recipient_phone}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <div className="flex justify-end gap-2">
                                                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl hover:bg-blue-50 hover:text-blue-600" onClick={() => handleViewDetail(order.id)}>
                                                    <Eye size={18} />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl hover:bg-amber-50 hover:text-amber-600" onClick={() => handleViewDetail(order.id, true)}>
                                                    <Pencil size={18} />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl hover:bg-rose-50 hover:text-rose-600" onClick={() => handleDelete(order.id)}>
                                                    <Trash2 size={18} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
                {totalPages >= 1 && (
                    <div className="flex justify-center items-center gap-2 py-6">
                        <Button
                            variant="ghost"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            &lt;
                        </Button>

                        {[...Array(totalPages)].map((_, i) => {
                            const pageNumber = i + 1;
                            return (
                                <Button
                                    key={pageNumber}
                                    onClick={() => setPage(pageNumber)}
                                    className={
                                        page === pageNumber
                                            ? "bg-[#00365c] text-white rounded-xl"
                                            : "rounded-xl"
                                    }
                                    variant={page === pageNumber ? "default" : "ghost"}
                                >
                                    {pageNumber}
                                </Button>
                            );
                        })}

                        <Button
                            variant="ghost"
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            &gt;
                        </Button>
                    </div>
                )}


                {/* Modal Detail & Edit */}
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-0 border-none shadow-2xl custom-scrollbar">
                        <DialogHeader className="p-8 bg-[#00365c] text-white">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <DialogTitle className="text-2xl font-black tracking-tight italic">
                                        {isEditing ? 'Edit Book Order' : 'Order Specification'}
                                    </DialogTitle>
                                    <p className="text-white/60 text-xs uppercase tracking-widest font-bold mt-1">Order ID: #{selectedOrder?.id}</p>
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
                                        <div className="space-y-3 p-4 bg-slate-50 rounded-2xl">
                                            <DetailField isRequired={true} label="Nama" value={selectedOrder.owner_name} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, owner_name: v })} />
                                            <DetailField isRequired={true} label="Phone" value={selectedOrder.owner_phone} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, owner_phone: v })} />
                                            <DetailField isRequired={true} label="Alamat" value={selectedOrder.owner_address} isEdit={isEditing} isArea onChange={(v) => setSelectedOrder({ ...selectedOrder, owner_address: v })} />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-emerald-600 mb-2 font-black text-xs uppercase tracking-widest">
                                            <MapPin size={14} /> Penerima (Recipient)
                                        </div>
                                        <div className="space-y-3 p-4 bg-emerald-50/50 rounded-2xl">
                                            <DetailField isRequired={true} label="Nama" value={selectedOrder.recipient_name} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, recipient_name: v })} />
                                            <DetailField isRequired={true} label="Phone" value={selectedOrder.recipient_phone} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, recipient_phone: v })} />
                                            <DetailField isRequired={true} label="Alamat" value={selectedOrder.recipient_address} isEdit={isEditing} isArea onChange={(v) => setSelectedOrder({ ...selectedOrder, recipient_address: v })} />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Pet Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-amber-600 mb-2 font-black text-xs uppercase tracking-widest">
                                        <PawPrint size={14} /> Informasi Hewan & Kargo
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-2 border-slate-50 rounded-[2rem]">
                                        <DetailField label="Nama Pet" value={selectedOrder.pet_name} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, pet_name: v })} />
                                        <DetailField label="Spesies" value={selectedOrder.pet_species} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, pet_species: v })} />
                                        <DetailField label="Warna" value={selectedOrder.pet_color} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, pet_color: v })} />
                                        <DetailField label="Berat (kg)" value={selectedOrder.pet_weight} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, pet_weight: v })} />
                                        <DetailField label="Crate Dim" value={selectedOrder.crate_dimension} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, crate_dimension: v })} />
                                        <DetailField label="Microchip" value={selectedOrder.pet_microchip} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, pet_microchip: v })} />
                                        <DetailField isRequired={true} label="Origin" value={selectedOrder.origin_city_or_airport} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, origin_city_or_airport: v })} />
                                        <DetailField isRequired={true} label="Destinasi" value={selectedOrder.destination_city_or_airport} isEdit={isEditing} onChange={(v) => setSelectedOrder({ ...selectedOrder, destination_city_or_airport: v })} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <DialogFooter className="p-8 bg-slate-50">
                            <Button variant="ghost" onClick={() => setIsDetailOpen(false)} className="rounded-xl font-bold">Close</Button>
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
        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}
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